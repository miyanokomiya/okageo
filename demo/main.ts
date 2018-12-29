import * as svg from '../src/svg'

const fileInput = document.getElementById('input') as HTMLInputElement
fileInput.onchange = (e) => {
  const file = (e.target as HTMLInputElement).files
  if (!file || file.length === 0) return

  const reader = new FileReader()
  reader.readAsText(file[0])
  reader.onload = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const pathInfoList = svg.parseSvgGraphicsStr(reader.result as string)
    const inRectList = svg.fitRect(pathInfoList, 0, 0, canvas.width, canvas.height)
    inRectList.forEach((info) => svg.draw(ctx, info))
  }
}
