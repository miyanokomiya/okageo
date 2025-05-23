# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [3.1.10] - 2025-03-14
### Added
- Add `getCrossBezier3AndBezier3` for calculating intersections between two bezier curves.

## [3.1.9] - 2024-09-16
### Fixed
- Fix invalid calculation of `getPathPointAtLength` that could return a point outside the path.

## [3.1.8] - 2024-09-16
### Fixed
- Fix invalid calculation of `getPathPointAtLength` that neglected the tail part.

## [3.1.7] - 2024-09-16
### Fixed
- Fix inaccurate calculation of `getPathPointAtLength`

## [3.1.6] - 2024-02-28
### Fixed
- Fix invalid calculation of `getPeriodicBezierInterpolation`

## [3.1.5] - 2024-02-27
### Fixed
- Fix invalid calculation of `getBezierInterpolation`

### Added
- Add `getPeriodicBezierInterpolation` for interpolating a polyline via periodic bezier curve.

## [3.1.4] - 2024-02-24
### Fixed
- Fix `getCrossSegAndBezier3` didn't take care of a segment but a line

### Added
- Add `getCrossLineAndBezier3` for line version of `getCrossSegAndBezier3`

## [3.1.3] - 2024-02-24
### Added
- Add `getCrossSegAndBezier3WithT` to get extra information of intersections
- Add `divideBezier3` to divide cubic bezier

## [3.1.2] - 2024-02-22
### Added
- Add `getCrossSegAndBezier3` to get intersections between a segment and a cubic bezier
- Add `getClosestPointOnBezier3` to get the closest point on a cubic bezier

## [3.1.1] - 2023-11-18
### Fixed
- Remove absolute position effect from optimal bezier interpolation for consistent result

## [3.1.0] - 2023-11-17
### Added
- Optimal bezier interpolation

## [3.0.8] - 2023-02-18
### Changed
- Migrate `parcel-bundler` to `parcel2` for demo

### Fixed
- Fix invalid parsing for decimal shorthand: `0.1.2` should be treated as `0.1 0.2`

## [3.0.7] - 2023-01-21
### Fixed
- Fix unexpected error for parsing arc segment when its radius is close to 0

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
