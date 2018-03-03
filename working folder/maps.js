function initializeMap() {
  console.log('initialize');

    var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: 40.7128, lng: -74.0060},
    zoom: 18,
    mapTypeId: 'satellite'
  });
  map.setTilt(45);

  var image = 'https://i.imgur.com/WQFbLCW.png';
  image.height = 1;
  image.width = 2;
  var beachMarker = new google.maps.Marker({
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

            beachMarker.setPosition(pos);
            map.setCenter(pos);

            var textbox = 'https://i.imgur.com/6OVfGMf.png';
            textbox.height = 2;
            textbox.width = 1;
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
                    title: "new story",
                    zIndex: i
                  }
                )
                marker.setPosition(pos1);
              }

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
    }



}
