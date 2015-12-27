/*jshint node:true*/
'use strict';
var path = require('path');
var jsonFile = require('jsonfile');
var objectAssign = require('object-assign');
var readPackage = require('./read-package');

module.exports = function (options) {
  var configPath = path.join(process.cwd(), 'package.json');
  var opts = readPackage(configPath);

  objectAssign(opts, options);

  jsonFile.writeFileSync(configPath, opts, { spaces: 2 });
};
