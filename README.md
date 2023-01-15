![Main](https://github.com/miyanokomiya/okageo/workflows/Main/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/miyanokomiya/okageo/badge.svg?branch=main)](https://coveralls.io/github/miyanokomiya/okageo?branch=main)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# okageo

Tools of Geometry and SVG.

## demo(wip)
https://miyanokomiya.github.io/okageo/

## usage

```sh
yarn add okageo
```

```js
import * as okageo from 'okageo'

// parse SVG to polygons
const pathInfoList = okageo.parseSvgGraphicsStr(svgString)

// move and resize
const canvas = document.getElementById('canvas')
const inRectList = okageo.fitRect(pathInfoList, 0, 0, canvas.width, canvas.height)

// draw
const ctx = canvas.getContext('2d')
inRectList.forEach((info) => okageo.draw(ctx, info))
```

## commnad

```sh
# install dependencies
$ yarn install

# lint
$ yarn lint

# test
$ yarn test [--watch]

# build
$ yarn build

# serve demo at localhost:1234
$ yarn demo
```

## publish
Create new release on Github.
