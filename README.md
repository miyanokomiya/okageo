![Main](https://github.com/miyanokomiya/okageo/workflows/Main/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/miyanokomiya/okageo/badge.svg?branch=master)](https://coveralls.io/github/miyanokomiya/okageo?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# okageo

parse SVG to polygons

## usage

``` bash
yarn add okageo
```

```js
import okageo from 'okageo'

// parse SVG to polygons
const pathInfoList = okageo.svg.parseSvgGraphicsStr(svgString)

// move and resize
const canvas = document.getElementById('canvas')
const inRectList = okageo.svg.fitRect(pathInfoList, 0, 0, canvas.width, canvas.height)

// draw
const ctx = canvas.getContext('2d')
inRectList.forEach((info) => okageo.svg.draw(ctx, info))
```

## commnad

``` bash
# install dependencies
$ yarn install

# lint
$ yarn lint

# test
$ yarn test [--watch]

# build
$ yarn build

# generate doc
$ yarn doc

# serve demo at localhost:1234
$ yarn demo
```
