$(document).ready(function() {
	$(".timehrsSection").clone().appendTo($(".cloneTimeHrs"));
	
    if ($('.mapSection').length > 0) {
        var map;
        google.maps.event.addDomListener(window, "load", function() {
            var map = new google.maps.Map(document.getElementById("map_div"), {
                center: new google.maps.LatLng(40.137508, -74.089629),
                zoom: 11,
                zoomControl: false,
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var infoWindow = new google.maps.InfoWindow();

            /*
             * marker creater function (acts as a closure for html parameter)
             */
            function createMarker(options, html) {
                var marker = new google.maps.Marker(options);
                if (html) {
                    google.maps.event.addListener(marker, "click", function() {
                        infoWindow.setContent(html);
                        infoWindow.open(options.map, this);
                    });
                }
                return marker;
            }
            /*add markers to map*/
            var marker0 = createMarker({
                position: new google.maps.LatLng(40.137508, -74.089629),
                map: map,
            });

            var marker1 = createMarker({
                position: new google.maps.LatLng(40.070730, -74.046798),
                map: map,
            });

            var marker2 = createMarker({
                position: new google.maps.LatLng(40.069431, -74.128023),
                map: map,
            });
            var marker3 = createMarker({
                position: new google.maps.LatLng(40.201300, -74.255699),
                map: map,
            });
            var marker4 = createMarker({
                position: new google.maps.LatLng(40.120684, -74.144013),
                map: map,
            });
        });
    }
});