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

# test
$ yarn test [--watch]

# build
$ yarn build

# generate doc
$ yarn doc

# serve demo at localhost:1234
$ yarn demo
```
