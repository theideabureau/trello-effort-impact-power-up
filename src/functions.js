'use strict';

import forEach from 'lodash.foreach';
import merge from 'lodash.merge';

var Promise = TrelloPowerUp.Promise;

export function eiValues(index) {

	const values = {
		1: 'Low',
		2: 'High'
	}

	return values[index];

}

export function eiScoreLabelDefaults() {

	return {
		1: 'Quick win',
		2: 'Major project',
		3: 'Fill in job',
		4: 'Thankless task'
	};

}

export function eiScoreLabels(t) {

	return eiSettings(t)
	.then(settings => {

		let labels = settings.labels;

		// if there is no labels, return the defaults
		if ( typeof labels === 'undefined' ) {
			return eiScoreLabelDefaults();
		}

		const defaults = eiScoreLabelDefaults();

		forEach(labels, (label, index) => {

			if ( label === '' ) {
				labels[index] = defaults[index];
			}

		});
		
		return labels;

	});

}

export function eiSettings(t) {

	const default_settings = {
		card_front_display: {
			effort_impact: true,
			score: true
		},
		labels: {
			1: '',
			2: '',
			3: '',
			4: ''
		}
	};

	return t.get('board', 'private', 'settings', {})
	.then(settings => {
		return merge(default_settings, settings);
	});

}

export function eiScore(t, effort, impact) {

	const scores = {
		'1_2': 1,
		'2_2': 2,
		'1_1': 3,
		'2_1': 4
	};

	return scores[effort + '_' + impact];

}

export function eiScoreLabel(t, effort, impact) {

	return new Promise(function(resolve, reject) {

		eiScoreLabels(t)
		.then(labels => {

			const label = labels[eiScore(t, effort, impact)];

			resolve(label);

		});

	});

}

export function eiCardDataValidator(data) {

	if ( typeof data !== 'object' ) {
		return false;
	}

	if ( typeof data.effort === 'undefined' ) {
		return false;
	}

	if ( [1, 2].indexOf(parseInt(data.effort)) === -1 ) {
		return false;
	}

	if ( typeof data.impact === 'undefined' ) {
		return false;
	}

	if ( [1, 2].indexOf(parseInt(data.impact)) === -1 ) {
		return false;
	}

	return true;

};

export function eiSortCards(t, opts, field, direction) {

	return new Promise(function(resolve, reject) {

		let card_values = {};
		let card_counter = 0;
		const cards_count = opts.cards.length;

		opts.cards.forEach(function(card) {

			t.get(card.id, 'shared', 'effort-impact')
			.then(function(data){

				if ( typeof data !== 'undefined' ) {

					const valued = {
						effort: data.effort,
						impact: data.impact,
						score: eiScore(t, data.effort, data.impact)
					}

					card_values[card.id] = valued[field];

				} else {
					card_values[card.id] = direction === 'asc' ? 9 : -1;
				}

				resolve(card_values);

			});

		});

	})
	.then(function(card_values) {

		var sortedCards = opts.cards.sort(function(a,b) {

			const a_value = card_values[a.id];
			const b_value = card_values[b.id];

			if (a_value > b_value ) {
				return 1;
			} else if (b_value > a_value) {
				return -1;
			}

			return 0;

		});

		let sorted_ids = sortedCards.map(function (c) { return c.id; });

		// the sort function will only ever sort asc, so if the order is desc
		// simply reverse the array before returning

		if ( direction === 'desc' ) {
			sorted_ids = sorted_ids.reverse();
		}

		return {
			sortedIds: sorted_ids
		};

	});

}
