getMyPosition();

// Location of Sydney Uni 
//myMap(-33.890896, 151.191071);


$(document).ready(function() {
    console.log("document ready");
    //getMyPosition();
    $('.collapsible').collapsible({
        onOpenStart: showDetailsInList
    });
})

var map;
var service;
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

    service.nearbySearch(request, callbackNearbySearch);
};

function callbackNearbySearch(results, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        console.log("results: ", results);
        createMarkers(results);
        createList(results);
    }
}


function createList(places) { 
    for (var i = 0; i<places.length; i++) {
        //console.log(places[i]);
        var name = places[i].name;
        var reference = places[i].reference;
        var vicinity = places[i].vicinity;
        var price_level = places[i].price_level;
        var price_level_symbol = "";
        var rating = places[i].rating;
        var user_ratings_total =  places[i].user_ratings_total;
        // Create $$$ representation of price_level
        if (price_level !== "undefined"){
            for (var j=0; j<price_level; j++){
                price_level_symbol = price_level_symbol +"$";
            }
            price_level_symbol = "- " + price_level_symbol;
        }

        var listItem = (i+1) + ". " + name + ", " + vicinity + ", Rating: " + rating + " (" + user_ratings_total + ") " + price_level_symbol;
        // console.log(listItem);
        var loadingStr = "Loading..."

        var li = $("<li>");
        var div = $("<div class='collapsible-header'>");
        $("#barlist").append(li);
        $("#barlist li:last").append(div);
        $("#barlist li:last div").text(listItem);
     
        var div2 =$("<div class='collapsible-body'>");
        $("#barlist li:last").append(div2);
        $("#barlist li:last div:last").text(loadingStr);
        $("#barlist li:last div:last").attr('id', i+'-cbody');
        $("#barlist li:last div:last").attr('reference', reference);
    }
}

function showDetailsInList(element){
    console.log("collapse onOpen was fired!");
    // console.log(element);
    var collapsibleBody = $(element).find('.collapsible-body');
    var referenceVal = collapsibleBody.attr("reference");
    console.log("reference: ", referenceVal);
    var id = collapsibleBody.attr("id");
    console.log(id);
    var request = { reference: referenceVal };
    service.getDetails(request, function (place, status) {
        console.log("callbackGetDetails(place: " , place);
        contentString = place.formatted_phone_number + "<br> " + place.formatted_address + "<br>";
        console.log(contentString);
        $("#" + id).html(contentString);
    })

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

        addInfoListener(marker, place);
        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}



//https://stackoverflow.com/questions/5868903/marker-content-infowindow-google-maps
// You must put this outside the for loop. Otherwise, you will always have place[20]. 

function addInfoListener(marker, place) {
    google.maps.event.addListener(marker, 'click', function () {
        // console.log("inside addListener", marker);
        var request = { reference: place.reference };
        // getDetails() must be called only when mouse is clicked.
        // If you call many times consecutively, access will be denied. 
        service.getDetails(request, function (place, status) {
            // console.log("callbackGetDetails(place: " + place, " status: ", status, ")");
            console.log("callbackGetDetails(place: " , place);

            var photoUrl="";
            if (typeof place.photos !== 'undefined') { 
                photoUrl = place.photos[0].getUrl();
            } 
            // console.log("PhotoURL: "+ photoUrl);

            contentString = place.name + "<br>" +
                            place.formatted_phone_number + "<br>" + place.formatted_address + "<br>" +
                            "<img src='" + photoUrl + "' width=250px><br>" +
                            "<a href='" + place.url +"' target='_blank'>Google Map</a>";
            //console.log(contentString);
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            infowindow.open(map, marker);
        }) // end of getDetails()
    }) // ebd of addListener()
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