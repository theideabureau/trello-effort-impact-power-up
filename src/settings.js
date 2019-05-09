/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

window.settings.addEventListener('submit', function(event) {

	// Stop the browser trying to submit the form itself.
	event.preventDefault();

	return t.set('board', 'private', 'labels', {
		1: window.score_1.value,
		2: window.score_2.value,
		3: window.score_3.value,
		4: window.score_4.value
	})
	.then(function(){
		t.closePopup();
	});

});

t.render(function() {

	return t.get('board', 'private', 'labels')
	.then(labels => {

		if ( typeof labels === 'undefined' ) {
			return;
		}

		window.score_1.value = labels[1];
		window.score_2.value = labels[2];
		window.score_3.value = labels[3];
		window.score_4.value = labels[4];

	})
	.then(function(){
		t.sizeTo('#settings');
	});

});
