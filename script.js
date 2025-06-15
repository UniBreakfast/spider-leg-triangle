const baseLineDict = { top: "bottom", bottom: "top"}
const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
const padding = 30
const arrowLength = 20
const arrowWidth = 12
const axisWidth = 2
const markLength = 8
const pointSize = 8
const lineWidth = 2
const yMarkCount = 20
const fontSize = 16
const font = "Trebuchet MS"
const yAxisX = padding + arrowWidth / 2
const yAxisLimit = padding + arrowLength
const xAxisY = innerHeight - padding - arrowWidth / 2
const xAxisLimit = innerWidth - padding - arrowLength
const unit = (xAxisY - yAxisLimit) / (yMarkCount + 1)
const xMarkCount = Math.floor((xAxisLimit - yAxisX) / unit) - 1
const A = [11, 9, "A"]
const B = [22, 6, "B"]
const C = [16, 14, "C"]
const a = Math.hypot(A[0] - C[0], A[1] - C[1])
const b = Math.hypot(B[0] - C[0], B[1] - C[1])

document.body.append(canvas)
updateSize()

window.onresize = updateSize

drawAxes()
drawPoint(...A)
drawPoint(...B)
drawPoint(...C, "top")
drawLine(A[0], A[1], C[0], C[1])
drawLine(B[0], B[1], C[0], C[1])
drawLine(A[0], A[1], B[0], B[1], 0.5)
drawCircle(A[0], A[1], a, 0.5)
drawCircle(B[0], B[1], b, 0.5)

function drawCircle(X, Y, R, width = lineWidth) {
    ctx.beginPath()
    ctx.arc(getX(X), getY(Y), getDistance(R), 0, 7)
    ctx.lineWidth = width
    ctx.stroke()
}

function drawLine(X1, Y1, X2, Y2, width = lineWidth) {
    ctx.beginPath()
    ctx.moveTo(getX(X1), getY(Y1))
    ctx.lineTo(getX(X2), getY(Y2))
    ctx.lineWidth = width
    ctx.stroke()
}

function updateSize() {
    canvas.width = innerWidth
    canvas.height = innerHeight
}

function drawAxes() {
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

        ctx.font = fontSize + "px " + font
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

function drawPoint(X, Y, label, side = "bottom") {
    const x = getX(X) 
    const y = getY(Y) 
    
    ctx.beginPath()
    ctx.arc(x, y, pointSize / 2, 0, 7)
    ctx.fill()

    ctx.font = fontSize * 2 + "px " + font
    ctx.textAlign = "center"
    ctx.textBaseline = baseLineDict[side] 
    if (side === "bottom") {
        ctx.fillText(label, x, y + fontSize)
    } else {
        ctx.fillText(label, x, y - fontSize)
    }

}

function getX(X) {
    return yAxisX + unit * X
}

function getY(Y) {
    return xAxisY - unit * Y
}

function getDistance(D) {
    return D * unit
}