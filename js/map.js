getMyPosition();

var map;
function myMap(lat, lon) {
    console.log(lat, lon);
    var currentPosition = new google.maps.LatLng(lat, lon);
    var mapProp = {
        center: currentPosition,
        zoom: 15,
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var request = {
        location: currentPosition,
        radius: '1500',
        type: ['bar']
    }
    service = new google.maps.places.PlacesService(map);
    //service.textSearch(request, callback);

    service.nearbySearch(request, callback);
};

function callback(results, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        console.log("results: ", results);
        createMarkers(results);
    }
}

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}



function getMyPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getMyPositionHandler, showGeoLocationError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};

function getMyPositionHandler(position) {
    console.log("Latitude: " + position.coords.latitude + "  Longitude: " + position.coords.longitude);
    myMap(position.coords.latitude, position.coords.longitude);
};

function showGeoLocationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
};
