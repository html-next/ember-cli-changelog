// jshint node:true
// var Git = require('nodegit');
var RSVP = require('rsvp');
var Git = {
  Repository: {
    lookup: function() {
      return RSVP.Promise.reject("nodegit needs replaced");
    }
  }
};

/**!
 *
 * @param {String} pathToProject
 * @returns {Object} Repository
 */
module.exports = function lookupRepository(pathToProject) {
  return Git.Repository.open(pathToProject);
};
