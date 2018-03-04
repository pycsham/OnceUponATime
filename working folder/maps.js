Array.prototype.repeat= function(what, L){
 while(L) this[--L]= what;
 return this;
}

var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2[0] - p1[0]);
  var dLong = rad(p2[1] - p1[1]);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1[0])) * Math.cos(rad(p2[0])) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

var pos0= [0,0];
var beachMarker;
var mapMarkerPos = [].repeat([0,0],10);

function initializeMap() {
  console.log('initialize');

    var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: 40.7128, lng: -74.0060},
    zoom: 18,
    mapTypeId: 'satellite'
  });
  map.setTilt(45);

  var image = {
    url : 'https://i.imgur.com/WQFbLCW.png',
    scaledSize: new google.maps.Size(50, 50),
  };
   beachMarker = new google.maps.Marker({
          map: map,
          icon: image,
          draggable: true,
          animation: google.maps.Animation.DROP,
        });

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            pos0[0]=pos.lat;
            pos0[1]=pos.lng;
            beachMarker.setPosition(pos);
            map.setCenter(pos);
            var shape = {
         coords: [1, 1, 1, 20, 18, 20, 18, 1],
         type: 'poly'
       };


       var circle = new google.maps.Circle({
         map: map,
         radius: 100,    // 10 miles in metres
         fillColor: '#dddddd',
         strokeColor: '#ffd21e',
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillOpacity: 0.35,
       });
       circle.bindTo('center', beachMarker, 'position');

            var textbox = 'https://i.imgur.com/oFukjry.png';

            for (var i = 0; i < 10; i++) {
                 var ran = Math.random() * 0.005 - 0.002;
                 var ran2 = Math.random() * 0.005 - 0.002;
                 var pos1 = {
                   lat: pos.lat + ran,
                   lng: pos.lng + ran2
                 };
                  var marker = new google.maps.Marker({
                    map: map,
                    icon: textbox,
                    shape: shape,
                    title: "new story",
                    zIndex: i,
                    opacity: 0.8,
                    //replace this url to next page
                    url: 'https://i.imgur.com/RpaZ6oa.png',
                  }
                )
                marker.setPosition(pos1);
                mapMarkerPos[i][0]=pos1.lat;
                mapMarkerPos[i][1]=pos1.lng;
                google.maps.event.addListener(marker, 'click', function() {

                  var dist =getDistance(pos0, mapMarkerPos[marker.zIndex])
                  if(dist < 100)
                    { console.log(dist);
                      window.location.href = marker.url;
                    }});
              }
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
    }

}
