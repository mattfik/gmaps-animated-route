define(['gmaps'],function(gmaps){
  var animationIndex = 0;

  function animateRoute(coords, map) {

    var self = this,
        step = 0,
        numSteps = 20,
        animationSpeed = 0.50,
        offset = animationIndex,
        nextOffset = animationIndex + 1,
        departure, destination, nextStop, line, interval;

    if (nextOffset >= coords.length) {
      clearInterval(interval);
      return false;
    }

    departure = coords[offset];
    destination = coords[nextOffset];

    line = new gmaps.Polyline({
      path: [departure, departure],
      geodesic: false,
      strokeColor: '#f1d32e',
      strokeOpacity: 1,
      strokeWeight: 2,
      map: map
    });

    interval = setInterval(function() {
      step++;
      if (step > numSteps) {
        animationIndex++;
        animateRoute(coords, map);
        clearInterval(interval);
      } else {
        nextStop = gmaps.geometry.spherical.interpolate(departure,destination,step/numSteps);
        line.setPath([departure, nextStop]);
      }
    }, animationSpeed);
  }

  return animateRoute;
});
