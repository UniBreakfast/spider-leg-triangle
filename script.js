const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
const padding = 30
const arrowLength = 20
const arrowWidth = 12
const axisWidth = 2
const markLength = 8
const yMarkCount = 20
const fontSize = 16
const yAxisX = padding + arrowWidth / 2
const yAxisLimit = padding + arrowLength
const xAxisY = innerHeight - padding - arrowWidth / 2
const xAxisLimit = innerWidth - padding - arrowLength
const unit = (xAxisY - yAxisLimit) / (yMarkCount + 1)
const xMarkCount = Math.floor((xAxisLimit - yAxisX) / unit) - 1

document.body.append(canvas)
updateSize()

window.onresize = updateSize

drawAxes(yMarkCount)
drawPoint()

function updateSize() {
    canvas.width = innerWidth
    canvas.height = innerHeight
}

function drawAxes(yLength) {
    ctx.lineWidth = axisWidth

    ctx.beginPath()
    ctx.moveTo(padding, yAxisLimit)
    ctx.lineTo(yAxisX, padding)
    ctx.lineTo(padding + arrowWidth, yAxisLimit)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(yAxisX, yAxisLimit)
    ctx.lineTo(yAxisX, innerHeight - padding)
    ctx.stroke()

    for (let i = 1; i < yMarkCount + 1; i++) {
        ctx.beginPath()
        ctx.moveTo(yAxisX - markLength / 2, yAxisLimit + unit * i)
        ctx.lineTo(yAxisX + markLength / 2, yAxisLimit + unit * i)
        ctx.stroke()

        ctx.font = fontSize + "px Trebuchet MS"
        ctx.textAlign = "right"
        ctx.textBaseline = "middle"
        ctx.fillText(yMarkCount + 1 - i, yAxisX - markLength / 2 - fontSize / 4, yAxisLimit + unit * i)
    }
    
    ctx.beginPath()
    ctx.moveTo(xAxisLimit, innerHeight - padding - arrowWidth)
    ctx.lineTo(innerWidth - padding, xAxisY)
    ctx.lineTo(xAxisLimit, innerHeight - padding)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(xAxisLimit, xAxisY)
    ctx.lineTo(padding, xAxisY)
    ctx.stroke()

    for (let i = 1; i < xMarkCount + 1; i++) {
        ctx.beginPath()
        ctx.moveTo(yAxisX + unit * i, xAxisY - markLength / 2)
        ctx.lineTo(yAxisX + unit * i, xAxisY + markLength / 2)
        ctx.stroke()

        ctx.font = fontSize + "px Trebuchet MS"
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.fillText(i, yAxisX + unit * i, xAxisY + markLength / 2 + fontSize / 4)
    }
}