# Changelog

Changelog of `data-tier` as per release.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.2.0] - 2021-05-08
### Changed
- removed `addRootDocument`/`removeRootDocument` in favor of `addDocument`/`removeDocument` APIs (deprecated since 2.11.0)
- [Issue #56](https://github.com/gullerya/data-tier/issues/56) - internal implementation improvements
- documentation updated
- dependencies maintanance

## [3.1.6] - 2021-04-24
### Added
- [Issue #70](https://github.com/gullerya/data-tier/issues/70) - added manually triggered release
### Changed
- documentation updated
- dependencies maintainance

## [3.1.4] - 2021-03-29
### Changed
- documentation updated
- dependencies maintainance

## [3.1.3] - 2021-02-01
### Added
- [Issue #68](https://github.com/gullerya/data-tier/issues/68) - exposing `Observable` implementation that is bundled with this `data-tier` version
- `cache-control` added to the CDN deployment

## [3.1.0] - 2021-01-30
### Changed
- [Issue #58](https://github.com/gullerya/data-tier/issues/58) - allowed to create/update ties with primitive model (`boolean`, `number`, `string`); won't throw now and will corretly do a ties updates
- [Issue #59](https://github.com/gullerya/data-tier/issues/59) - capable of create/update ties with `null`; won't throw now and will correctly do a ties updates
- `nullish` model values (`undefined`, `null`) transformation into an empty string is now limited to only:
  - `textContent` target property for any element
  - `value` target property for only these: `INPUT`, `SELECT`, `TEXTAREA`

## [3.0.0] - 2021-01-28
### Changed
- [Issue #60](https://github.com/gullerya/data-tier/issues/60):
  - removed `defaultTieTarget` property support (less intrusive approach aggenda)
  - removed `changeEvent` property support (less intrusive approach aggenda)
  - added new syntax to specify the event to listen to per tied property
  - added support for multiple events as per multiple properties tied

## [2.12.0] - 2021-01-17
### Changed
- updated dependencies
- [Issue #61](https://github.com/gullerya/data-tier/issues/61) - release version automation

## [2.11.1] - 2020-11-18
### Changed
- updated dependencies

## [2.11.0] - 2020-11-13
### Added
- [Issue #53](https://github.com/gullerya/data-tier/issues/53) - version to the runtime
### Changed
- [Issue #41](https://github.com/gullerya/data-tier/issues/41) - thoroughtly revised DOM processing mechanics
- updated dependencies
### Deprecated
- `addRootDocument` API, (use `addDocument` instead)
- `removeRootDocument` API, (use `removeDocument` instead)

## [2.10.1] - 2020-10-24
### Added
- security process to be used - [TideLift](https://tidelift.com/security)
### Changed
- updated dependencies
- added release automation
- removed Travis CI (in favor of GitHub actions)

## [2.10.0] - 2020-09-10
### Fixed
- [Issue #50](https://github.com/gullerya/data-tier/issues/50) - fixed a scoped views lifecycle, case when view added before the model
- upgraded dependencies

## [2.9.5] - 2020-08-22
### Fixed
- [Issue #49](https://github.com/gullerya/data-tier/issues/48) - fixed a new API: `DataTier.ties.update(key, newModel);` which misbehaved when non-existing **scoped** (element) key provided
- upgraded dependencies

## [2.9.4] - 2020-08-04
### Fixed
- implemented [Issue #48](https://github.com/gullerya/data-tier/issues/48) - fixed a new API: `DataTier.ties.update(key, newModel);`
- upgraded dependencies

## [2.9.3] - 2020-04-06
### Added
- [Issue #42](https://github.com/gullerya/data-tier/issues/42) - added a possibility to update tie's model as a whole via new API: `DataTier.ties.update(key, newModel);`
- upgraded dependencies

## [2.8.7] - 2020-02-24
### Changed
- upgraded `object-observer` dependency, bearing an important, yet meanwhile experimental, functionality for a repeater like consumers

## [2.7.2] - 2020-02-15
### Added
- adding experimental __scoped__ tying capabilities - not yet publically available

## [2.5.0] - 2020-02-05
### Added
- [Issue #40](https://github.com/gullerya/data-tier/issues/40) - documented all of the latest changes, verified functional tying documentation
- add full tutorial example and improved tutorials description (should add more use-cases in the future)

## [2.4.0] - 2020-02-04
### Added
- [Issue #39](https://github.com/gullerya/data-tier/issues/39) - added support for a `classList` in a special manner
### Changed
- changed behavior of the nested properties change when parent is watched - now parent is also notified

## [2.3.0] - 2020-01-25
### Fixed
- [Issue #37](https://github.com/gullerya/data-tier/issues/37) - fixed mishandlings of the `data-tie` property changes
- attempting to push performance further (switched model change observer definition from `bind` to lambda syntax)

## [2.2.0] - 2020-01-05
### Added
- [Issue #36](https://github.com/gullerya/data-tier/issues/36) - method/function based tying
- enhanced tests coverage
- performance tunings

## [2.1.2] - 2019-12-18
### Added
- documentation improved and enhanced
- added full test coverage for a tie params

## [2.1.0] - 2019-12-17
### Fixed
- [Issue #34](https://github.com/gullerya/data-tier/issues/34) - tying the model at the root level
- minor documentation improvements

## [2.0.2] - 2019-12-15
### Fixed
- documentation improvements and enhancements

## [2.0.0] - 2019-12-14
### Changed
- [issue #29](https://github.com/gullerya/data-tier/issues/29) - removing non-convenience and ambiguity in API usage

> This point (`2.0.0`) is an API breaking point! Please refer to the API documentation.

---
# Historical releases

* __1.14.0__
  * upgrading `object-observer` dependency, which has a fix for a proper handling of an Error objects

* __1.13.1__
  * fixed [issue #32](https://github.com/gullerya/data-tier/issues/32) - when mistakenly same property tied more than once - error is shown, the first one is effective
  * fixed [issue #33](https://github.com/gullerya/data-tier/issues/33) - fixes a defect with NULL value in the deep object's tied path
  * fixed issue (non-reported) with creation of non existing path by change event

* __1.12.1__
  * moved to newer version of `just-test`, providing real tests in CI and coverage now

* __1.12.0__
  * upgraded dependencies (specifically `object-observer` including some important fixes)

* __1.11.0__
  * performance tuning and preventing potential double processing of child nodes

* __1.10.0__
  * upgraded dependencies (specifically `object-observer` including some important fixes)

* __1.9.0__
  * upgraded dependencies (specifically `object-observer` including some important fixes)

* __1.7.1__
  * fixed [issue #26](https://github.com/gullerya/data-tier/issues/26) - shadow DOM hosts were not tied properly, when collected before than defined
  * fixed [issue #27](https://github.com/gullerya/data-tier/issues/27) - accedentaly root document DOM was observed twice, leading to annoying warning in logs and wasted CPU cycles

* __1.7.0__
  * fixed [issue #25](https://github.com/gullerya/data-tier/issues/25) - yet another issue with the nested tied elements within shadow DOMs

* __1.6.2__
  * fixed [issue #24](https://github.com/gullerya/data-tier/issues/24) - adding `MutationObserver` to any shadow DOM (or even any document root) added to the `data-tier`

* __1.6.1__
  * implemented [issue #23](https://github.com/gullerya/data-tier/issues/23) - auto-tying/untying the __open__ shadow DOM during the addition/removal of the host elements to the living DOM; providing APIs to explicitly add/remove shadow DOM for a __closed__ shadow DOM case and for the elements that the shadow DOM is attached to them 'post-factum' (when they are already in the living DOM)

* __1.5.0__
  * added default target property `src` for the following elements: `iframe`, `img`, `source`

* __1.4.2__
  * performance improvements (mainly in the area of collecting new view from DOM)
  * improved print outs to clarify the library boot process/times
  * add initial experimental implementation of support for a micro frontend design patterning [issue #3](https://github.com/gullerya/data-tier/issues/3)

* __1.4.1__
  * implemented [issue #21](https://github.com/gullerya/data-tier/issues/21) - missing `Tie` won't do anything with tied elements - allowing to work with multiple unrelated instances of `DataTier` in the same application (microfrontends - we are coming!!!) 

* __1.3.0__
  * implemented [issue #18](https://github.com/gullerya/data-tier/issues/18) - well defined API to customize `change`-like event
  * implemented [issue #19](https://github.com/gullerya/data-tier/issues/19) - graceful handling of removing (already) non-existing ties
  * implemented [issue #20](https://github.com/gullerya/data-tier/issues/20) - support for default target property as well as customization of it
  
* __1.2.0__
  * fixed an issue where single element mapped to few different ties was not updated correctly
  * upgraded dependencies

* __1.1.2__
  * upgraded `object-observer` dependency to `2.0.2`, having some essential fix for issue #20

* __1.1.0__
  * upgraded `object-observer` dependency to `2.0.0`, which affects the support matrix
  * fixed an issue with not-yet upgraded customized elements (not ideal, but works, waiting for spec to have it ideal)

* __1.0.3__
  * Fixed [issue no. 15](https://github.com/gullerya/data-tier/issues/15)
  * Improved error handling during elements collection in order to not break the flow due to a single failure

* __1.0.2__
  * Fixed [issue no. 14](https://github.com/gullerya/data-tier/issues/14)

* __1.0.0__
  * First release to hold an ES6 module flavor distribution only (pay attention to the library loading)
  * Fixed view -> model flow for `input` of type `checkbox`
  * Fixed an error in the log where non-tied elements were removed from DOM

Medieval
--------

* __0.6.25__
  * Fixed [issue no. 13](https://github.com/gullerya/data-tier/issues/13)

* __0.6.22__
  * initial provisioning of ES6 module
  * new API defined and implemented in ES6 module distribution

Ancient
-------

* __0.6.19__
  - Fixed incorrect behavior when `tie-property` configured on the element **after** it was added to the DOM

* __0.6.18__
  - Fixed [issue no. 12](https://github.com/gullerya/data-tier/issues/12)

* __0.6.17__
  - Added `tie-property` OOTB controller - having parameter syntax `path.to.data => propName` it is made possible to tie to arbitrary element property (yes, this is having `CustomElements` in mind)

* __0.6.16__
  - Fixed potential issue with empty (`null`) object traversal in deep tying

* __0.6.15__
  - Fixed [issue no. 11](https://github.com/gullerya/data-tier/issues/11)

* __0.6.14__
  - Fixed defect in `tie-list` controller when text nodes present in the `template` element
  - Added `tie-datetime-text` OOTB controller

* __0.6.13__
  - Added `tie-input` OOTB controller in other to track an immediate changes in input elements supporting `input` event (types: `text`, `password` of `input` element, `textarea` element).

* __0.6.12__
  - Fixed [issue no. 10](https://github.com/gullerya/data-tier/issues/10)
  - Further performance improvements

* __0.6.11__
  - Fixed [issue no. 8](https://github.com/gullerya/data-tier/issues/8)
  - Fixed [issue no. 9](https://github.com/gullerya/data-tier/issues/9)
  - Minor performance improvements

* __0.6.10__
  - Added a possibility to create/update Tie's data with a plain JS object, in this case `data-tier` will attempt to auto-create and use `Observable` from it, using an embedded `Observable` implementation   
  - Fixed [issue no. 7](https://github.com/gullerya/data-tier/issues/7)

* __0.6.9__
  - Conceptually `Rule` has been replaced by `Controller`. There are still no API changes with regard to that, nor any API are yet published, but there will be some refactoring in this area in future releases
  - Fixed [issue no. 6](https://github.com/gullerya/data-tier/issues/6), some performance improvements made for a large scale DOM manipulations

* __0.6.8__
  - Fixes: issue no. 2 (smooth handling of an empty values given to the controllers definition), issue no. 4 (non working repeaters on subgraph list), issue no. 5 (improvements of `data-tie-classes`)

* __0.6.7__
  - Added a possibility to create a tie without providing any initial data, for early setup with lazy data provisioning

* __0.6.5__
  - Fixed a case that element having no dataset breaks the views collection flow (this is not a valid case, but see this [issue](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10790130/#) in Edge, so got to be defensive here)
  -	Added `tieSrc` rule and removed obsolete `tieImage` rule (did the same as `tieSrc`, just in a less general flavor)
  - Added `tieHRef` rule
  - Added `tieClasses` rule

* __0.6.0__
  - Moved to `object-observer.js` library as an observation engine, were impacted both the API and the implementation.

Primordial
----------

* __0.5.41__
  - First version, based on native `Object.observe` technology.
