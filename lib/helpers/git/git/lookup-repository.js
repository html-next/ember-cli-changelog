// jshint node:true
var Git = require('nodegit');

/**!
 *
 * @param {String} pathToProject
 * @returns {Object} Repository
 */
module.exports = function lookupRepository(pathToProject) {
  return Git.Repository.open(pathToProject);
};
