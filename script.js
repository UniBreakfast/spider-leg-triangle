let showGeometry = false
const baseLineDict = { top: "bottom", bottom: "top" }
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
let xAxisLimit = innerWidth - padding - arrowLength
const unit = (xAxisY - yAxisLimit) / (yMarkCount + 1)
let xMarkCount = Math.floor((xAxisLimit - yAxisX) / unit) - 1
const A = [11, 9, "A"]
const B = [22, 6, "B"]
const C = [16, 14, "C"]
const a = calcDistance(A, C)
const b = calcDistance(B, C)

document.body.append(canvas)

window.onresize = render
window.onmousedown = () => {
    window.onmousemove = update
}
window.onmouseup = () => {
    window.onmousemove = null
}

window.onclick = e => {
    if (!e.shiftKey) return
    showGeometry = !showGeometry
    render()
}

render()

function render() {
    const d = calcDistance(A, B)
    const alpha = calcAngle(a, d, b)
    const beta = calcAngle(b, d, a)
    const gamma = calcAngle(a, b, d)
    const dA = Math.cos(alpha) * a
    const D = [A[0] + (B[0] - A[0]) * (dA / d), A[1] + (B[1] - A[1]) * (dA / d), "D"]
    const c = Math.sin(alpha) * a

    if (B[0] > A[0]) {
        C[1] = c * (D[0] - A[0]) / dA + D[1]
        C[0] = D[0] - c * (D[1] - A[1]) / dA
    } else {
        C[1] = D[1] - c * (D[0] - A[0]) / dA
        C[0] = D[0] + c * (D[1] - A[1]) / dA
    }
    console.log({ alpha, beta, gamma })

    xMarkCount = Math.floor((xAxisLimit - yAxisX) / unit) - 1
    xAxisLimit = innerWidth - padding - arrowLength
    updateSize()
    drawAxes()
    drawSegment(A, C)
    drawSegment(B, C)
    if (showGeometry) {
        drawPoint(...A)
        drawPoint(...B)
        drawPoint(...C, "top")
        drawPoint(...D)
        drawSegment(A, B, 0.5)
        drawSegment(C, D, 0.5)
        drawCircle(A[0], A[1], a, 0.5)
        drawCircle(B[0], B[1], b, 0.5)
    }
}

function update(e) {
    B[0] = getRelativeX(e.x)
    B[1] = getRelativeY(e.y)
    const d = calcDistance(A, B)

    if (d > a + b || d < Math.abs(a - b)) return

    render()
}

function calcDistance([x1, y1], [x2, y2]) {
    return Math.hypot(x1 - x2, y1 - y2)
}

function calcAngle(adj1, adj2, opp) {
    return Math.acos((adj1 ** 2 + adj2 ** 2 - opp ** 2) / (2 * adj1 * adj2))
}

function drawCircle(X, Y, R, width = lineWidth) {
    ctx.beginPath()
    ctx.arc(getRealX(X), getRealY(Y), getDistance(R), 0, 7)
    ctx.lineWidth = width
    ctx.stroke()
}

function drawLine(X1, Y1, X2, Y2, width = lineWidth) {
    ctx.beginPath()
    ctx.moveTo(getRealX(X1), getRealY(Y1))
    ctx.lineTo(getRealX(X2), getRealY(Y2))
    ctx.lineWidth = width
    ctx.stroke()
}

function drawSegment([X1, Y1], [X2, Y2], width = lineWidth) {
    drawLine(X1, Y1, X2, Y2, width)
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
    const x = getRealX(X)
    const y = getRealY(Y)

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

function getRealX(X) {
    return yAxisX + unit * X
}

function getRelativeX(x) {
    return (x - yAxisX) / unit
}

function getRealY(Y) {
    return xAxisY - unit * Y
}

function getRelativeY(y) {
    return (xAxisY - y) / unit
}

function getDistance(D) {
    return D * unit
}