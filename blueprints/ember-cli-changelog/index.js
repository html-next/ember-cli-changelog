/*jshint node:true*/
module.exports = {
  description: 'Installs initial CHANGELOG.md file, config/release.js and ember-cli-release',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function() {
     this.addAddonToProject('ember-cli-release');
  }
};
