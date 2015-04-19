define(['gmaps'], function(gmaps) {

  function Draw(options) {
    this.options = this.extend(this._options, options);
    this.init();
  }

  Draw.prototype = {
    // default options
    _options: {

    },

    map: {},

    collection: [],

    init: function() {
      this.map = this.options.map;
    },

    drawPath: function() {

      var _this = this;

      var timing = 0;
      var timingStep = 1000;
      var lastLatLng = {};

      // Add click handler to gather latLng points for animation
      gmaps.event.addListener(_this.map, "click", function (e) {

        if(_this.collection.length === 0) {
          _this.lastLatLng = e.latLng;
        }

        var lat = e.latLng.lat();
        var lng = e.latLng.lng();

        _this.collection.push({
          "latitude"  : lat.toString(),
          "longitude" : lng.toString(),
          "timestamp" : timing.toString()
        });
        timing = timing + timingStep;

        console.log(_this.lastLatLng);

        var coords = [_this.lastLatLng, e.latLng];

        var line = new google.maps.Polyline({
          path: coords,
          geodesic: false,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        line.setMap(_this.map);

        // Update the last recorded points
        _this.lastLatLng = e.latLng;

      });

    },

    printPathData: function() {

      _this = this;

      var data = JSON.stringify(_this.collection);
      var url = 'data:text/json;charset=utf8,' + encodeURIComponent(data);

      window.open(url, '_blank');
      window.focus();

    },

    extend: function(a, b) {

      for (var key in b) {
        if (b.hasOwnProperty(key)) {
          a[key] = b[key];
        }
      }
      return a;

    }
  }


  return Draw;

});