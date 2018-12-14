/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

const ei_values = {
	1: 'Low',
	2: 'Medium',
	3: 'High'
}

TrelloPowerUp.initialize({

	'card-badges': function(t, opts) {

		return t.card()
		.then(function(){

			return t.get('card', 'shared', 'effort-impact')
			.then(function(data) {

				if ( ei_data_validator(data) ) {

					return [
						{
							text: 'Effort: ' + ei_values[data.effort]
						},
						{
							text: 'Impact: ' + ei_values[data.impact]
						},
						{
							text: 'Score: ' + ei_score(data.effort, data.impact)
						}
					];

				}

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
					url: './input.html'
				});

			}
		}];

	},

	'card-detail-badges': function (t, opts) {

		return t.card()
		.then(function(cardName){

			return t.get('card', 'shared', 'effort-impact')
			.then(function(data) {

				if ( ei_data_validator(data) ) {

					return [
						{
							title: 'Effort',
							text: ei_values[data.effort],
							callback: function (t, opts) {

								return t.popup({
									title: "Effort / Impact",
									url: './input.html'
								});

							}
						},
						{
							title: 'Impact',
							text: ei_values[data.impact],
							callback: function (t, opts) {

								return t.popup({
									title: "Effort / Impact",
									url: './input.html'
								});

							}
						},
						{
							title: 'Score',
							text: ei_score(data.effort, data.impact)
						}
					];

				}

			});

		});

	},

	'list-sorters': function (t) {

		return t.list('name', 'id')
		.then(function (list) {
			return [
				{
					text: "Effort (Lowest First)",
					callback: function (t, opts) {
						 return ei_sort_cards(t, opts, 'effort', 'asc');
					}
				},
				{
					text: "Impact (Highest First)",
					callback: function (t, opts) {
						 return ei_sort_cards(t, opts, 'impact', 'desc');
					}
				},
				{
					text: "Score (Best First)",
					callback: function (t, opts) {
						 return ei_sort_cards(t, opts, 'score', 'asc');
					}
				}
			];
		});

	}
});

const ei_data_validator = function(data) {

	if ( typeof data !== 'object' ) {
		return false;
	}

	if ( typeof data.effort === 'undefined' ) {
		return false;
	}

	if ( [1, 2, 3].indexOf(parseInt(data.effort)) === -1 ) {
		return false;
	}

	if ( typeof data.impact === 'undefined' ) {
		return false;
	}

	if ( [1, 2, 3].indexOf(parseInt(data.impact)) === -1 ) {
		return false;
	}

	return true;

};

const ei_sort_cards = function(t, opts, field, direction) {

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
						score: ei_score(data.effort, data.impact)
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

const ei_score = function(effort, impact) {
	return (effort - impact) + 3;
}
