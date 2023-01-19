import * as geo from '../src/geo'
import * as svg from '../src/svg'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')
const fileInput = document.getElementById('input') as HTMLInputElement
fileInput.onchange = (e) => {
  const file = (e.target as HTMLInputElement).files
  if (!file || file.length === 0) return

  const reader = new FileReader()
  reader.readAsText(file[0])
  reader.onload = () => {
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const pathInfoList = svg.parseSvgGraphicsStr(reader.result as string)
    const inRectList = svg.fitRect(
      pathInfoList,
      0,
      0,
      canvas.width,
      canvas.height
    )
    inRectList.forEach((info) => {
      geo.triangleSplit(info.d).forEach((points) => {
        svg.draw(ctx, { d: points, style: info.style })
      })
    })
  }
}

function runReverse() {
  const text = (document.getElementById('input-path') as HTMLInputElement)!
    .value
  ;(document.getElementById('reverse-result') as HTMLInputElement)!.value =
    svg.pathSegmentRawsToString(
      svg.reversePath(svg.splitD(text).map(svg.parsePathSegmentValue))
    )

  document.getElementById('path-src')!.setAttribute('d', text)
  document
    .getElementById('path-dist')!
    .setAttribute(
      'd',
      svg.pathSegmentRawsToString(
        svg.reversePath(svg.splitD(text).map(svg.parsePathSegmentValue))
      )
    )
}
runReverse()
document.getElementById('run-reverse')!.addEventListener('click', runReverse)

function runModify() {
  const text = (document.getElementById('input-path2') as HTMLInputElement)!
    .value

  document.getElementById('path-src2')!.setAttribute('d', text)
  const segs = svg.splitD(text).map(svg.parsePathSegmentValue)
  document
    .getElementById('path-dist2')!
    .setAttribute(
      'd',
      svg.pathSegmentRawsToString(svg.slidePath(segs, { x: 30, y: 30 }))
    )
  document
    .getElementById('path-dist3')!
    .setAttribute(
      'd',
      svg.pathSegmentRawsToString(svg.scalePath(segs, { x: -1, y: 1 }))
    )
  document
    .getElementById('path-dist4')!
    .setAttribute(
      'd',
      svg.pathSegmentRawsToString(svg.scalePath(segs, { x: 1, y: -1 }))
    )
  document
    .getElementById('path-dist5')!
    .setAttribute(
      'd',
      svg.pathSegmentRawsToString(svg.scalePath(segs, { x: -1, y: -1 }))
    )
}
runModify()
document.getElementById('run-modify')!.addEventListener('click', runModify)

function runRotate() {
  const text = (document.getElementById('input-rotate') as HTMLInputElement)!
    .value

  document.getElementById('rotate-src2')!.setAttribute('d', text)
  const segs = svg.splitD(text).map(svg.parsePathSegmentValue)
  document
    .getElementById('rotate-dist2')!
    .setAttribute(
      'd',
      svg.pathSegmentRawsToString(svg.rotatePath(segs, (2 * Math.PI) / 5))
    )
  document
    .getElementById('rotate-dist3')!
    .setAttribute(
      'd',
      svg.pathSegmentRawsToString(svg.rotatePath(segs, (2 * (Math.PI * 2)) / 5))
    )
  document
    .getElementById('rotate-dist4')!
    .setAttribute(
      'd',
      svg.pathSegmentRawsToString(svg.rotatePath(segs, (2 * (Math.PI * 3)) / 5))
    )
  document
    .getElementById('rotate-dist5')!
    .setAttribute(
      'd',
      svg.pathSegmentRawsToString(svg.rotatePath(segs, (2 * (Math.PI * 4)) / 5))
    )
}
runRotate()
document.getElementById('run-rotate')!.addEventListener('click', runRotate)
