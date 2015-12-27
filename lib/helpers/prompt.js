// jshint node:true
var inquirer = require('inquirer');
var RSVP = require('rsvp');

module.exports = function(options) {
  return new RSVP.Promise(function(resolve, reject) {
    inquirer.prompt(options, function (result) {
      if (!result[options.name]) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
};
