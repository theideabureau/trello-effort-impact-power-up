/* global TrelloPowerUp */

import {eiValues, eiScoreLabel, eiCardDataValidator, eiSortCards, eiSettings} from './functions.js'

var Promise = TrelloPowerUp.Promise;

TrelloPowerUp.initialize({

	'show-settings': function(t, opts) {

		// when a user clicks the gear icon by your Power-Up in the Power-Ups menu
		// what should Trello show. We highly recommend the popup in this case as
		// it is the least disruptive, and fits in well with the rest of Trello's UX

		return t.popup({
			title: 'Effort / Impact Settings',
			url: './templates/settings.html',
			height: 184 // we can always resize later
		});

	},

	'card-badges': function(t, opts) {

		return eiSettings(t)
		.then(settings => {

			// there is no point in fetching any more data if we're not doing to display
			if ( settings.card_front_display.effort_impact === false && settings.card_front_display.score === false ) {
				return;
			}

			return t.get('card', 'shared', 'effort-impact')
			.then(card_data => {

				return eiScoreLabel(t, card_data.effort, card_data.impact)
				.then(score_label => {

					if ( eiCardDataValidator(card_data) ) {

						let badges = [];

						if ( settings.card_front_display.effort_impact === true ) {

							badges.push({
								text: 'Effort: ' + eiValues(card_data.effort)
							});

							badges.push({
								text: 'Impact: ' + eiValues(card_data.impact)
							});

						}

						if ( settings.card_front_display.score === true ) {

							badges.push({
								text: 'Score: ' + score_label
							});

						}

						return badges;

					}

				});

			});

		});

	},

	'card-buttons': function(t, options){

		return [{
			icon: './img/icon-square-grayscale.svg',
			text: 'Effort / Impact',
			callback: function(t){

				return t.popup({
					title: "Effort / Impact",
					url: './templates/input.html'
				});

			}
		}];

	},

	'card-detail-badges': function (t, opts) {

		return t.get('card', 'shared', 'effort-impact')
		.then(card_data => {

			return eiScoreLabel(t, card_data.effort, card_data.impact)
			.then(score_label => {

				if ( eiCardDataValidator(card_data) ) {

					let badges = [
						{
							title: 'Effort',
							text: eiValues(card_data.effort),
							callback: function (t, opts) {

								return t.popup({
									title: "Effort / Impact",
									url: './templates/input.html'
								});

							}
						},
						{
							title: 'Impact',
							text: eiValues(card_data.impact),
							callback: function (t, opts) {

								return t.popup({
									title: "Effort / Impact",
									url: './templates/input.html'
								});

							}
						}
					];

					badges.push({
						title: 'Score',
						text: score_label
					});

					return badges;

				}

			});

		});

	},

	'list-sorters': function (t) {

		return t.list('name', 'id')
		.then(list => {
			return [
				{
					text: "Effort (Lowest First)",
					callback: function (t, opts) {
						 return eiSortCards(t, opts, 'effort', 'asc');
					}
				},
				{
					text: "Impact (Highest First)",
					callback: function (t, opts) {
						 return eiSortCards(t, opts, 'impact', 'desc');
					}
				},
				{
					text: "Score (Best First)",
					callback: function (t, opts) {
						 return eiSortCards(t, opts, 'score', 'asc');
					}
				}
			];
		});

	}
});
