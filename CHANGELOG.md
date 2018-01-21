Changelog
=========

## v0.4.0-beta.0 (January 21st, 2018)

### Pull Requests

- [#167](https://github.com/html-next/ember-cli-changelog/pull/167)  Update ember-resolver to version 4.0.0 🚀  *by [html-next](https://github.com/html-next)*
- [#14](https://github.com/html-next/ember-cli-changelog/pull/14)  Update all the things  *by [seawatts/feature](https://github.com/seawatts/feature)*
- [#16](https://github.com/html-next/ember-cli-changelog/pull/16)  Add GitHub auth for private repos  *by [seawatts/feature](https://github.com/seawatts/feature)*
- [#20](https://github.com/html-next/ember-cli-changelog/pull/20)  Blueprint fixes  *by [Offir Golan](https://github.com/offirgolan)*
- [#27](https://github.com/html-next/ember-cli-changelog/pull/27)  Ember style & custom ignore  *by [Baptiste Meurant](https://github.com/bmeurant)*
- [#26](https://github.com/html-next/ember-cli-changelog/pull/26)  Update ember-cli to version 2.6.3 🚀  *by [Chris Thoburn](https://github.com/runspired)*
- [#22](https://github.com/html-next/ember-cli-changelog/pull/22)  dep(github) 2.1.0  *by [Chris Thoburn](https://github.com/runspired/feature)*
- [#28](https://github.com/html-next/ember-cli-changelog/pull/28)  ember-cli-inject-live-reload@1.4.1 untested ⚠️  *by [Chris Thoburn](https://github.com/runspired)*
- [#24](https://github.com/html-next/ember-cli-changelog/pull/24)  Update github to version 2.2.0 🚀  *by [Chris Thoburn](https://github.com/runspired)*
- [#36](https://github.com/html-next/ember-cli-changelog/pull/36)  Set angular as default in blueprint  *by [Offir Golan](https://github.com/offirgolan)*
- [#191](https://github.com/html-next/ember-cli-changelog/pull/191)  Update mocha to version 3.4.1 🚀  *by [html-next](https://github.com/html-next)*
- [#187](https://github.com/html-next/ember-cli-changelog/pull/187)  ember-cli-htmlbars@1.3.2 untested ⚠️  *by [html-next](https://github.com/html-next)*
- [#17](https://github.com/html-next/ember-cli-changelog/pull/17)  Added the date to the changelog title  *by [seawatts/feature](https://github.com/seawatts/feature)*
- [#133](https://github.com/html-next/ember-cli-changelog/pull/133)  ember-cli-inject-live-reload@1.5.0 untested ⚠️  *by [html-next](https://github.com/html-next)*
- [#33](https://github.com/html-next/ember-cli-changelog/pull/33)  broccoli-asset-rev@2.4.5 untested ⚠️  *by [html-next](https://github.com/html-next)*
- [#72](https://github.com/html-next/ember-cli-changelog/pull/72)  jsonfile@2.4.0 untested ⚠️  *by [html-next](https://github.com/html-next)*
- [#159](https://github.com/html-next/ember-cli-changelog/pull/159)  rsvp@3.5.0 untested ⚠️  *by [html-next](https://github.com/html-next)*
- [#155](https://github.com/html-next/ember-cli-changelog/pull/155)  Update github to version 9.2.0 🚀  *by [html-next](https://github.com/html-next)*
- [#162](https://github.com/html-next/ember-cli-changelog/pull/162)  moment@2.18.1 untested ⚠️  *by [html-next](https://github.com/html-next)*
- [#100](https://github.com/html-next/ember-cli-changelog/pull/100)  Update ember-cli-app-version to version 2.0.1 🚀  *by [html-next](https://github.com/html-next)*
- [#199](https://github.com/html-next/ember-cli-changelog/pull/199)  Merge develop to master  *by [html-next](https://github.com/html-next)*
- [#200](https://github.com/html-next/ember-cli-changelog/pull/200)  Update deps  *by [html-next](https://github.com/html-next)*
- [#201](https://github.com/html-next/ember-cli-changelog/pull/201)  runspired -> html-next  *by [html-next](https://github.com/html-next)*
- [#202](https://github.com/html-next/ember-cli-changelog/pull/202)  Remove jshint comments  *by [html-next](https://github.com/html-next)*

#### Commits

- [49e14a40](https://github.com/html-next/ember-cli-changelog/commit/49e14a40d16e2e68ee59e8c94dc9977ec8ab6157) **test(commit-filter)**: add missing tests for ignoring standard and custom types *by [Baptiste Meurant](https://github.com/bmeurant)*
- [f254a3ff](https://github.com/html-next/ember-cli-changelog/commit/f254a3ffad7d27850edbabbe727125b6a5326989) **feat(commit-filter)**: add option for user to ignore custom types *by [Baptiste Meurant](https://github.com/bmeurant)*
- [73360cf0](https://github.com/html-next/ember-cli-changelog/commit/73360cf0dd020fd9bf3e9f06dedc2d2f4be8e385) **test(commit-group-sort)**: add missing tests for other commits *by [Baptiste Meurant](https://github.com/bmeurant)*
- [de48f464](https://github.com/html-next/ember-cli-changelog/commit/de48f4640ea8e8603ac3fe0cff73d8427ab275d8) **fix(commit-group-sort)**: allow not scoped ember commits *by [Baptiste Meurant](https://github.com/bmeurant)*
- [8916d489](https://github.com/html-next/ember-cli-changelog/commit/8916d489db2f18cd439f2730b7b0ea662e18062b) **test(ember-style-parser)**: add missing tests for standard and non standard scoped commits *by [Baptiste Meurant](https://github.com/bmeurant)*
- [bea4756c](https://github.com/html-next/ember-cli-changelog/commit/bea4756c366bff2fd8eb3c65512a4e37558341a1) **fix(ember-style-parser)**: commit types are now correctly extracted *by [Baptiste Meurant](https://github.com/bmeurant)*

## v0.3.4

#### Commits

- [937ed274](https://github.com/html-next/ember-cli-changelog/commit/937ed274bc4ee0675d9adf28cc152cd52571e454) **fix(travis)**: hard locks jquery so travis test-all won't fail *by [Chris Thoburn](https://github.com/runspired)*
- [11958cfc](https://github.com/html-next/ember-cli-changelog/commit/11958cfc2abd16da1e1697f059d3b6ed2c63e98f) **fix(travis)**: updates travis configuration *by [Chris Thoburn](https://github.com/runspired)*

## v0.3.3

#### Commits

- [6a2a11b8](https://github.com/html-next/ember-cli-changelog/commit/6a2a11b8109a84ad2470fb1b4bed47c361eed8a6) **feat(fast-release)**: removes double prompt for changelog generation *by [Chris Thoburn](https://github.com/runspired)*

## v0.3.2

#### Commits

- [5f7fd08b](https://github.com/html-next/ember-cli-changelog/commit/5f7fd08b61dcd021404b4fb4afadc58f6ff3039a) **fix(generate)**: don't incude titles for groups that don't have any commits *by [Chris Thoburn](https://github.com/runspired)*
- [05896152](https://github.com/html-next/ember-cli-changelog/commit/05896152660ff7f9525c0585e28bf14376e520f4) **fix(default-sort)**: commits will now be sorted most recent first *by [Chris Thoburn](https://github.com/runspired)*

## v0.3.1

- [f7bb5745](https://github.com/html-next/ember-cli-changelog/commit/f7bb574567f83308945fbbcc1517383b2a0b013d) **fix(chore-filter)**: all commit types will now filter chore commits from the log *by [Chris Thoburn](https://github.com/runspired)*
- [ef26d788](https://github.com/html-next/ember-cli-changelog/commit/ef26d788f9d8165acd7a481a6d32d4143e09eb7e) **feat(task-filter)**: all commit types will now filter task commits from the log *by [Chris Thoburn](https://github.com/runspired)*

## v0.3.0

- [2834e33a](https://github.com/html-next/ember-cli-changelog/commit/2834e33a6bbc37d7d5e27cd54e33d42df66cac53) **feat(angular-style)**: filter out chore commits *by [Chris Thoburn](https://github.com/runspired)*

## v0.2.3

- [a0d0a969](https://github.com/html-next/ember-cli-changelog/commit/a0d0a9690d4c738f338967cc7220020fd343e3c1) **fix(blueprint)**: installed release.js file no longer adds incorrect beforeCommit hook *by [Chris Thoburn](https://github.com/runspired)*

## v0.2.2

- [170319a7](https://github.com/html-next/ember-cli-changelog/commit/170319a76855f7b6189a68f8c11503495e61b12e) **fix(blueprint)**: updates configurations *by [Chris Thoburn](https://github.com/runspired)*

## v0.2.1

- [96696667](https://github.com/html-next/ember-cli-changelog/commit/96696667bfc5ec0f69d17944d7e79365522af289) **fix(default-blueprint)**: ensure installation works *by [Chris Thoburn](https://github.com/runspired)*

## v0.2.0

- [a51f966e](https://github.com/html-next/ember-cli-changelog/commit/a51f966ef89f5dd123e45cfa16d528761ce86cbe) **breaking(local-git)**: completely drops nodegit dependency as it destroys build times and angrily errors out for bad reasons when it's a secondary dependency *by [Chris Thoburn](https://github.com/runspired)*

## v0.1.1

- [9f69a3d1](https://github.com/html-next/ember-cli-changelog/commit/9f69a3d1c2c1e3e0b3146083806f83058ea2f698) **fix(dependencies)**: nodegit doesn't build on travis unless we use master *by [Chris Thoburn](https://github.com/runspired)*

## v0.1.0

### Pull Requests

- [#4](https://github.com/html-next/ember-cli-changelog/pull/4) **docs**: Add link to Angular Git Commit Guidelines  *by [Andrew Timberlake](https://github.com/andrewtimberlake)*

#### Important Commits

- [a2e90af2](https://github.com/html-next/ember-cli-changelog/commit/a2e90af2174e6586ca675cc27d60731c3c041355) **feat(ember-style-commits)**: adds support for ember-style commit parsing *by [Chris Thoburn](https://github.com/runspired)*
- [7dab5206](https://github.com/html-next/ember-cli-changelog/commit/7dab520605a1007ddababc40eb1948ce89ac2de8) **breaking(config)**: removes the ability to manually specify github usage *by [Chris Thoburn](https://github.com/runspired)*
- [436df1d4](https://github.com/html-next/ember-cli-changelog/commit/436df1d485999cab786b0f3ad77c9cd41cf3c295) **feat(ember-style)**: accounts for ember-style in filter and formatter *by [Chris Thoburn](https://github.com/runspired)*
- [36926dae](https://github.com/html-next/ember-cli-changelog/commit/36926dae2e309a4ae4cdc41d05952ee3bb59ad12) **feat(enhanced-usernames)**: collects authors and committers into an authors hash as we discover their logins *by [Chris Thoburn](https://github.com/runspired)*
- [ddd2d081](https://github.com/html-next/ember-cli-changelog/commit/ddd2d08108b421e873892033483e3933712bb8e5) **feat(enhanced-usernames)**: attempts to resolve a real name for a username when a discrepency between PR and commit author is found *by [Chris Thoburn](https://github.com/runspired)*

## v0.0.1

### Pull Requests

- [#1](https://github.com/html-next/ember-cli-changelog/pull/1) **feat**: adds nicer styling for pull request entries in the …  *by [Chris Thoburn](https://github.com/runspired)*
- [#2](https://github.com/html-next/ember-cli-changelog/pull/2)  [WIP] turn changelog script into a command  *by [miguelcobain](https://github.com/miguelcobain)*

#### Commits

- [c87d4be6](https://github.com/html-next/ember-cli-changelog/commit/c87d4be6570e18140a09620259f420ba59d7bfb8) **chore(readme)**: adds information about what this project is *by [Chris Thoburn](https://github.com/runspired)*
- [506b18ca](https://github.com/html-next/ember-cli-changelog/commit/506b18ca0b30ac9af1f076fb8ccf220894eed13f) **feat(release.json)**: adds release.json file for storing configuration or the changelog process *by [Chris Thoburn](https://github.com/runspired)*
- [888d92d1](https://github.com/html-next/ember-cli-changelog/commit/888d92d1d5665e84d0316a0617cd9f9b2b12ab3d) **fix(changelog)**: adds commit parsing *by [Chris Thoburn](https://github.com/runspired)*
- [e84de175](https://github.com/html-next/ember-cli-changelog/commit/e84de1757c1c06d6846dab24ecac8fe459578a41) **feat(parse-commit)**: adds the ability to parse out information from a commit *by [Chris Thoburn](https://github.com/runspired)*
- [d85cada4](https://github.com/html-next/ember-cli-changelog/commit/d85cada4bc51cf82d9a510dd664f6004616dff73) **feat(pr-entries)**: adds nicer styling for pull request entries in the changelog *by [Chris Thoburn](https://github.com/runspired)*
- [46d5d22f](https://github.com/html-next/ember-cli-changelog/commit/46d5d22f59c6852baa1e6f609de0377fc4b55e6e) **chore(parse-commit)**: removes unused vars *by [Chris Thoburn](https://github.com/runspired)*

## v0.0.0

- Hold Your Horses,
- Pack Your Parachutes,
- We're Coming,
- But we haven't released anything yet.
