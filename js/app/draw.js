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

      _this.timing = 0;
      _this.timingStep = 1000;

      // Add click handler to gather latLng points for animation
      gmaps.event.addListener(_this.map, "click", function (e) {

        var lat = e.latLng.lat();
        var lng = e.latLng.lng();

        _this.collection.push({
          "latitude"  : lat.toString(),
          "longitude" : lng.toString(),
          "timestamp" : _this.timing.toString()
        });

        _this.timing = _this.timing + _this.timingStep;
        _this.numPoints = _this.numPoints + 1;

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