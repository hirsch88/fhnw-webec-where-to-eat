$(document).ready(function () {

	var map;
	
	window.navigator.geolocation.getCurrentPosition(showPosition);
	setEventListener();
	setView($($('nav > a')[0]).data('view'));
	

	// --------------------------------------------------
	function setMap(position) {
		GoogleMapsLoader.load(function(google) {
			var here = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
			map = new google.maps.Map(document.getElementById('map'), {
				center: here,
				zoom: 15
			});
			console.log(map);
		});
	}

	function showPosition(position) {
		console.log(position);
		setMap(position);
	}

	function setEventListener() {
		$('nav > a').on('click', onClickNavigation);
	}

	function onClickNavigation(event) {
		event.preventDefault();
		setView($(event.target).closest('a').data('view'));
	}

	function setView(viewName){
		$('nav > a').removeClass('active');
		$('nav > a[data-view="'+viewName+'"]').addClass('active');

		$('main > section').hide();
		$('main > #'+viewName).show();
	}

});
