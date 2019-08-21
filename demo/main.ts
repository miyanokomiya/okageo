import * as geo from '../src/geo'
import * as svg from '../src/svg'
import { ISvgPath } from '../types'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')
if (ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const p1 = [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 0, y: 100 }]
  const p2 = [{ x: -100, y: -100 }, { x: -100, y: 400 }, { x: 200, y: -100 }]
  const p3 = [{ x: -200, y: -200 }, { x: 300, y: -200 }, { x: -200, y: 600 }]
  const pathInfoList: ISvgPath[] = [
    {
      d: [
        { x: -300, y: 50 },
        { x: 200, y: 50 },
        { x: 200, y: 100 },
        { x: -300, y: 100 }
      ],
      style: {
        ...svg.createStyle(),
        fill: true,
        fillStyle: 'red'
      }
    },
    {
      d: p3,
      included: [p2, p1],
      style: {
        ...svg.createStyle(),
        fill: true,
        fillStyle: 'blue'
      }
    }
  ]
  const inRectList = svg.fitRect(
    pathInfoList,
    0,
    0,
    canvas.width,
    canvas.height
  )
  inRectList.forEach(info => svg.draw(ctx, info))
}

const fileInput = document.getElementById('input') as HTMLInputElement
fileInput.onchange = e => {
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
    inRectList.forEach(info => {
      geo.triangleSplit(info.d).forEach(points => {
        svg.draw(ctx, { d: points, style: info.style })
      })
    })
  }
}
