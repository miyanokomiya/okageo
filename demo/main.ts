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

document.getElementById('run-reverse')!.addEventListener('click', () => {
  const text = (document.getElementById('input-path') as HTMLInputElement)!
    .value
  svg.splitD(text).map(svg.parsePathSegmentValue)
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
})
