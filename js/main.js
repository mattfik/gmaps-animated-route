requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    app: '../app',
    'async': 'async',
    'goog': 'goog',
    'propertyParser' : 'propertyParser'
  },
  shim: {
    'underscore': {
      exports: '_'
    }
  }
});

define(
  'gmaps',
  ['async!https://maps.googleapis.com/maps/api/js?libraries=geometry&amp;sensor=false'],
function(){
  return window.google.maps;
});

requirejs([
  'app/route',
  'gmaps',
],
function(route, gmaps) {
  // all ready!
});
