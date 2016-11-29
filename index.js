var path = require('path');
var glob = require('glob');

var components = {};
//Abstract components
var doNotRequire = [
  'Component',
  'WiredWheel',
  'Rotor',
  'ThinRotor',
  'Reflector',
  'ThinReflector'
];

glob.sync(path.join(__dirname, 'dist/**/*.js')).forEach(function (component) {
  var componentName = path.parse(component).name;
  if(doNotRequire.indexOf(componentName) === -1) {
    components[componentName] = require(component);
  }
});

module.exports = components;
