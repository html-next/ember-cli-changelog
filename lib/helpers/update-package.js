/*jshint node:true*/
'use strict';
var path = require('path');
var jsonFile = require('jsonfile');
var objectAssign = require('object-assign');
var readPackage = require('./read-package');

module.exports = function(project, options) {
  var configPath = path.join(project.root, 'package.json');
  var opts = readPackage(project.root);

  objectAssign(opts, options);

  jsonFile.writeFileSync(configPath, opts, { spaces: 2 });
};
