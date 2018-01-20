Changelog
=========

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
