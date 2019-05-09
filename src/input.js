/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

window.estimate.addEventListener('submit', function(event) {

	// Stop the browser trying to submit the form itself.
	event.preventDefault();

	return t.set('card', 'shared', 'effort-impact', {
		effort: window.effort.value,
		impact: window.impact.value
	})
	.then(function(){
		t.closePopup();
	});

});


t.render(function() {

	return t.get('card', 'shared', 'effort-impact')
	.then(function(data){

		if ( typeof data === 'undefined' ) {
			return;
		}

		window.effort.value = data.effort;
		window.impact.value = data.impact;

	})
	.then(function(){
		t.sizeTo('#estimate');
	});

});
