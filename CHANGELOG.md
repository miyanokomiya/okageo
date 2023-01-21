# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [3.0.6] - 2023-01-21
### Fixed
- Fix invalid path parsing for exponent number like `-2.2e-14`

## [3.0.5] - 2023-01-19
### Added
- Add new functions to modify SVG path: reverse, slide, scale, rotate

## [3.0.4] - 2023-01-15
### Fixed
- Fix `getArcLerpFn` not to deal with complex number

## [3.0.3] - 2023-01-11
### Added
- Add new argument for `parsePathD` to adjust its accuracy
- Add `getPathTotalLength` as an alternative of `SVGGeometryElement.getTotalLength`
- Add `getPathPointAtLength` as an alternative of `SVGGeometryElement.getPointAtLength`

## [3.0.2] - 2022-06-27
### Changed
- Replace build system
- Remove `typedoc`

## [3.0.1] - 2022-06-27
### Changed
- Bump dependencies

## [3.0.0] - 2022-03-19
### Breaking
- Change compiler target to `es2015`

### Added
- Export declaration map
- Add `CHANGELOG.md`
