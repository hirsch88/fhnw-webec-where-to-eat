$(document).ready(function () {

  // Variables
  var map, here, service;
  var formElements = ['Vegi', 'Pizza', 'Burger', 'Sushi'];
  var selectedFormElement = formElements[1];
  var iconUrl = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|c68dda';

  // Bootstrapping
  generateFormElements();
  setEventListener();
  setView($($('nav > a')[2]).data('view'));

  // --------------------------------------------------
  function setEventListener() {
    // Registers the navigation click event to change the view
    $('nav > a').on('click', onClickNavigation);

    // Registers the form action button to search for the given category
    $('#form').find('.action > button').on('click', onClickFormGo);
  }

  function onClickNavigation(event) {
    event.preventDefault();
    setView($(event.target).closest('a').data('view'));
  }

  function onClickFormGo(event) {
    event.preventDefault();
    selectedFormElement = $('#form').find('input:checked').val();
    setView('map');
  }

  function setSpinner(element) {
    element.html('<div class="spinner"><i class="fa fa-refresh fa-spin"></i></div>');
  }

  function setMap() {
    window.navigator.geolocation.getCurrentPosition(loadMap);

    function loadMap(position) {
      here = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map = new google.maps.Map(document.getElementById('map'), {
        center: here,
        zoom: 15
      });
      setPlaces();
    }
  }

  function setPlaces() {
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: here,
      radius: 500,
      types: ['restaurant'],
      keyword: selectedFormElement
    }, function (results, status) {
      results.forEach(function (place) {
        new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: iconUrl
        });
      });
      generatePlaceList(results);
    });
  }

  function generatePlaceList(places) {
    var $list = $('#list').find('ol');
    $list.empty();
    var item = function (place, idx) {
      return '<li id="list-item-' + idx + '">\
          <b>' + place.name + '</b>\
          <span>' + place.vicinity + '</span>\
        </li>';
    };

    places.forEach(function (place, idx) {
      $list.append(item(place, idx));
    });
  }

  function setView(viewName) {
    if (viewName === 'map') {
      setSpinner($('#map'));
      setMap();
    }
    $('nav > a').removeClass('active');
    $('nav > a[data-view="' + viewName + '"]').addClass('active');

    $('main > section').hide();
    $('main > #' + viewName).show();
  }

  function generateFormElements() {
    var item = function (name, idx) {
      var checked = (name === selectedFormElement) ? 'checked' : '';
      return '<div class="form-item">\
        <input id="form-item-' + idx + '" type="radio" name="from-item" value="' + name + '" ' + checked + '/>\
        <label for="form-item-' + idx + '">\
          <i class="fa fa-check"></i>\
          <span>' + name + '</span>\
        </label>\
      </div>';
    };

    var $formList = $('#form').find('.list');
    formElements.forEach(function (name, idx) {
      $formList.append(item(name, idx));
    });
  }

});
