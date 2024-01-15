const WebSocket = require('ws')
const { logTrace, logError } = require('../log')

exports.websocketServer = (port) => {
    const wss = new WebSocket.WebSocketServer({ port })
    wss.on('connection', function connection(ws) {
        console.log('Client connected to room websocket server')
        const interval = setInterval(() => {
            ws.send(JSON.stringify({
                type: 'KEEP-ALIVE'
            }))
        }, 1000)
        ws.on("close", () => {
            logTrace("Client disconnected")
        })
        ws.onerror = function () {
            logError("Some Error occurred")
        }
        ws.on('message', (msg) => {
            logTrace(`msg received: ${msg}`)
        })
    })
}
