const WebSocket = require("ws")
const { logTrace, logError } = require("../log")
const {
  KEEP_ALIVE,
  UPDATE_SELECT,
  PLAY_GAME,
  HYDRATE_SELECT,
  RESET,
  NEWBIE,
  JOIN_ROOM,
  LEAVE_ROOM,
} = require("../constant/ws")
const { playGame } = require("./play-game")
const { hydrateSelect } = require("./hydrate-select")
const { reset } = require("./reset")
const { updateSelect } = require("./update-select")
const { newbie } = require("./newbie")
const { joinRoom } = require("./join-room")
const { leaveRoom } = require("./leave-room")


exports.websocketServer = (port) => {
  const wss = new WebSocket.WebSocketServer({ port })
  wss.on("connection", function connection(ws, request, client) {
    const interval = setInterval(() => {
      ws.send(
        JSON.stringify({
          type: KEEP_ALIVE,
        })
      )
    }, 1000)
    ws.on("close", () => {
      logTrace("Client disconnected")
    })
    ws.onerror = function () {
      logError("Some Error occurred")
    }
    ws.on("message", async (msg) => {
      logTrace(`Received message ${msg} from user ${client}`)
      const message = JSON.parse(msg)
      logTrace(`msg received: ${msg}`)
      if (message.type === NEWBIE) return newbie(ws, message)
      if (message.type === JOIN_ROOM) return joinRoom(ws, message)
      if (message.type === LEAVE_ROOM) return leaveRoom(ws, message)
      if (message.type === UPDATE_SELECT) return updateSelect(ws, message)
      if (message.type === PLAY_GAME) return playGame(ws, message)
      if (message.type === RESET) return reset(ws, message)
      if (message.type === HYDRATE_SELECT) return hydrateSelect(ws, message)
    })
  })
}
