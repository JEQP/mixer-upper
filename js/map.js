getMyPosition();

// Location of Sydney Uni 
// myMap(-33.890896, 151.191071);

var map;
var service;
var currentInfoWindow = null;
var markerArr = [];

function myMap(lat, lon) {
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
        createMarkers(results);
        createList(results);
    }
}


function createList(places) { 
    for (var i = 0; i<places.length; i++) {
        var name = places[i].name;
        var reference = places[i].reference;
        var vicinity = places[i].vicinity;
        var price_level = places[i].price_level;
        var price_level_symbol = "";
        var rating = places[i].rating;
        var user_ratings_total =  places[i].user_ratings_total;
        var user_rating_symbol = "";
        // Create $$$ representation of price_level
        if (price_level !== "undefined"){
            for (var j=0; j<price_level; j++){
                price_level_symbol = price_level_symbol +"$";
            }
            price_level_symbol = "- " + price_level_symbol;
        }

        // Create star symbol
        if (rating !== "undefined"){
            for (var k=0; k <= rating-1; k++){
                user_rating_symbol= user_rating_symbol + "★";
            }
        }

        var listItem = (i+1) + ". " + name +  
        ", Rating: " + rating + " " + user_rating_symbol + " (" + user_ratings_total + ") " + price_level_symbol;
        var loadingStr = "Loading..."

        var ul = $("<ul>");
        $("#barlist").append(ul);
        $("#barlist ul").addClass("collapsible");
        $("#barlist ul").attr("style", "width: 100%;");
 
        var li = $("<li>");
        var div = $("<div class='collapsible-header'>");
        $("#barlist ul").append(li);
        $("#barlist ul li:last").append(div);
        $("#barlist ul li:last div").html(listItem);
     
        var div2 =$("<div class='collapsible-body'>");
        $("#barlist ul li:last").append(div2);
        $("#barlist ul li:last div:last").text(loadingStr);
        $("#barlist ul li:last div:last").attr('id', i+'-cbody');
        $("#barlist ul li:last div:last").attr('reference', reference);

        // This is required for making the list collapsible. Run this after list has been created.  
        $('.collapsible').collapsible({
            onOpenStart: showDetailsInList
        });
    
    }
}

function showDetailsInList(element){
    var collapsibleBody = $(element).find('.collapsible-body');
    var referenceVal = collapsibleBody.attr("reference");
    var id = collapsibleBody.attr("id");

    // Trigger click on the map for the correspoing item when an item on list is selected. 
    var makerArrIndex = id.replace("-cbody","");
    new google.maps.event.trigger(markerArr[makerArrIndex],'click');

    var request = { reference: referenceVal };
    service.getDetails(request, function (place, status) {
        var contentString = "";

        // Add Photo
        if (typeof place.photos !== 'undefined') { 
            var photoUrl = place.photos[0].getUrl();
            contentString = contentString + "<img src='" + photoUrl + "' width=250px></p>" ;
        } 

        // Add Phone
        contentString = contentString + "<b>Phone: </b>" + place.formatted_phone_number + "</p>" ;

        // Add Address
        contentString = contentString + "</p><b>Address: </b>" + place.formatted_address + "</p>" ;

        
        // Add Opening hours
        var contentString = contentString + "<b>Opening Hours:</b> <br>";
        for (var i=0; i<place.opening_hours.weekday_text.length; i++){
            contentString = contentString + place.opening_hours.weekday_text[i] + "<br>";
        }

        // Add Website URL
        contentString = contentString + "<p><b>Web: </b>" ;
        if (typeof place.website !== 'undefined'){ 
            var websiteUrl = place.website;
            contentString = contentString + "<b><a href='" + websiteUrl +"' target='_blank'>Website</a> </b> | ";
        }

        // Add Google Map URL
        contentString = contentString + "<b> <a href='" + place.url +"' target='_blank'>Google Map</a> </b>";


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
        markerArr[i] = marker;
        addInfoListener(marker, place);
        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}



//https://stackoverflow.com/questions/5868903/marker-content-infowindow-google-maps
// You must put this outside the for loop. Otherwise, you will always have place[20]. 

function addInfoListener(marker, place) {
    google.maps.event.addListener(marker, 'click', function () {
        var request = { reference: place.reference };
        // getDetails() must be called only when mouse is clicked.
        // If you call many times consecutively, access will be denied. 
        service.getDetails(request, function (place, status) {

            var contentString = place.name + "<br>" +
                                place.formatted_address + "<br>" + 
                                place.formatted_phone_number + "<br>";

            if (typeof place.website !== 'undefined'){ 
                var websiteUrl = place.website;
                contentString = contentString + "<a href='" + websiteUrl +"' target='_blank'>Website</a> | ";
            }

            contentString = contentString + "<a href='" + place.url +"' target='_blank'>Google Map</a>";

            // close window when another one is being opened.
            if (currentInfoWindow){
                currentInfoWindow.close();
            }
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            infowindow.open(map, marker);
            currentInfoWindow = infowindow;
        }) // end of getDetails()
    }) // end of addListener()
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
            $("#googleMap").text("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            $("#googleMap").text("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            $("#googleMap").text("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            $("#googleMap").text("An unknown error occurred.");
            break;
    }
};
