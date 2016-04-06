$(document).ready(function () {

	var map, google, here;
		
	// window.navigator.geolocation.getCurrentPosition(showPosition);
	setEventListener();
	setView($($('nav > a')[0]).data('view'));
	

	// --------------------------------------------------
	function setSpinner(element) {
		element.html('<div class="spinner"><i class="fa fa-refresh fa-spin"></i></div>');
	}

	function setMap() {
		console.log('setMap');
		window.navigator.geolocation.getCurrentPosition(loadMap);

		function loadMap(position) {
			console.log('loadMap', position);
			GoogleMapsLoader.load(function(_google) {
				google = _google;
				here = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
				map = new google.maps.Map(document.getElementById('map'), {
					center: here,
					zoom: 15
				});
				console.log('GoogleMapsLoader', google, here, map);
			});
		}
	}

	function setEventListener() {
		$('nav > a').on('click', onClickNavigation);
	}

	function onClickNavigation(event) {
		event.preventDefault();
		setView($(event.target).closest('a').data('view'));
	}

	function setView(viewName){
		if(viewName === 'map'){
			setSpinner($('#map'));
			setMap();
		}
		$('nav > a').removeClass('active');
		$('nav > a[data-view="'+viewName+'"]').addClass('active');

		$('main > section').hide();
		$('main > #'+viewName).show();
	}

});
