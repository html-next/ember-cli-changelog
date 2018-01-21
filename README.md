Ember-cli-changelog
===================

[![Greenkeeper badge](https://badges.greenkeeper.io/html-next/ember-cli-changelog.svg)](https://greenkeeper.io/)

[![npm version](https://badge.fury.io/js/ember-cli-changelog.svg)](http://badge.fury.io/js/ember-cli-changelog)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-changelog.svg)](http://emberobserver.com/addons/ember-cli-changelog)
[![Build Status](https://travis-ci.org/html-next/ember-cli-changelog.svg)](https://travis-ci.org/html-next/ember-cli-changelog)

This addon provides a template for helping you keep an updated changelog
for your ember-cli project or addon.

## Better Releases

This addon integrates with [ember-cli-release](https://github.com/lytics/ember-cli-release) by
giving you the opportunity to generate changelog updates and manually edit them if needed before
ember-cli-release completes the release commit.

## Commit Styles

This addon parses your commit messages in order to be able to format them better in your changelog.
By default, it assumes you are using angular-style commit messages, but `ember` and `jquery` style
are also supported.

- [angular-style](https://github.com/angular/angular.js/blob/v1.4.8/CONTRIBUTING.md#commit).
- [ember-style](https://github.com/emberjs/ember.js/blob/master/CONTRIBUTING.md#commit-tagging)
- [jquery-style](https://contribute.jquery.org/commits-and-pull-requests/#commit-guidelines)

Set the `style` property to `ember` `angular` or `jquery` to specify your preference, or implement
`hooks.parser` to parse the commits in a custom manner.  (Guidelines on what a parsed commit will
need to expose coming soon).

## Hooks

Nearly every step of the changelog generation process is hookable via `config/changelog.js`.

## Github Private Repos

If you want to use github private repos set your github token with the following environment variable
 
`GITHUB_TOKEN=123abc`

## Contributing

 - Open an Issue for discussion first if you're unsure a feature/fix is wanted.
 - Branch off of `master`
 - Use descriptive branch names
 - Use Angular-Style Commits
 - PR against `master`.
 
