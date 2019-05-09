/* global TrelloPowerUp */

import {eiSettings} from './functions.js'

var t = TrelloPowerUp.iframe();

window.settings.addEventListener('submit', function(event) {

	// Stop the browser trying to submit the form itself.
	event.preventDefault();

	return t.set('board', 'private', 'settings', {
		card_front_display: {
			effort_impact: window.ei__cf_effort_impact.checked,
			score: window.ei__cf_score.checked
		},
		labels: {
			1: window.ei__score_1.value,
			2: window.ei__score_2.value,
			3: window.ei__score_3.value,
			4: window.ei__score_4.value
		}
	})
	.then(function(){
		t.closePopup();
	});

});

t.render(function() {

	return eiSettings(t)
	.then(settings => {

		// card front display
		window.ei__cf_effort_impact.checked = settings.card_front_display.effort_impact;
		window.ei__cf_score.checked = settings.card_front_display.score;

		// labels
		window.ei__score_1.value = settings.labels[1];
		window.ei__score_2.value = settings.labels[2];
		window.ei__score_3.value = settings.labels[3];
		window.ei__score_4.value = settings.labels[4];

	})
	.then(function(){
		t.sizeTo('#settings');
	});

});
