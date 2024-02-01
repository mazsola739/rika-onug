const WebSocket = require("ws")
const {logTrace, logError, logErrorwithStack} = require("../log")
const {
  UPDATE_ROOM, READY, RESET, NEWBIE, JOIN_ROOM, LEAVE_ROOM, LEAVE_TABLE, ARRIVE_GAME_TABLE, ARRIVE_ROOM, START_GAME,
  DEAL, ARRIVE_GAME_PLAY, STOP_GAME, RELOAD, INTERACTION
} = require("../constant/ws")
const {hydrateRoom} = require("./hydrate-room")
const {reset} = require("./reset")
const {updateRoom} = require("./update-room")
const {newbie} = require("./newbie")
const {joinRoom} = require("./join-room")
const {leaveRoom} = require("./leave-room")
const {leaveTable} = require("./leave-table")
const {ready} = require("./ready")
const {hydrateGameTable} = require("./hydrate-game-table")
const {startGame} = require('./start-game')
const {dealCards} = require('./deal-cards')
const {hydrateGamePlay} = require('./hydrate-game-play')
const {stopGame} = require("./stop-game")
const {reload} = require("./reload")
const {interaction} = require("./interaction")

exports.websocketServer = (port) => {
  try {
    const wss = new WebSocket.WebSocketServer({port})
    wss.on("connection", function connection(ws, request, client) {
      ws.on("close", () => {
        logTrace("Client disconnected")
      })
      ws.onerror = function () {
        logError("Some Error occurred")
      }
      ws.on("message", async (rawMessage) => {
        logTrace(`Received message ${rawMessage} from user ${client}`)
        const message = JSON.parse(rawMessage)
        logTrace(`msg received: ${rawMessage}`)
        if (message.type === NEWBIE) return newbie(ws, message)

        if (ws.token !== message.token) return
        if (message.type === RELOAD) return reload(ws, message)
        if (message.type === JOIN_ROOM) return joinRoom(ws, message)
        if (message.type === LEAVE_ROOM) return leaveRoom(ws, message)
        if (message.type === UPDATE_ROOM) return updateRoom(message)
        if (message.type === DEAL) return dealCards(ws, message)
        if (message.type === LEAVE_TABLE) return leaveTable(ws, message)
        if (message.type === RESET) return reset(message)
        if (message.type === ARRIVE_ROOM) return hydrateRoom(ws, message)
        if (message.type === ARRIVE_GAME_TABLE) return hydrateGameTable(ws, message)
        if (message.type === READY) return ready(message)
        if (message.type === START_GAME) return startGame(message)
        if (message.type === ARRIVE_GAME_PLAY) return hydrateGamePlay(ws, message)
        if (message.type === STOP_GAME) return stopGame(message)
        if (message.type === INTERACTION) return interaction(ws, message)
      })
    })
  } catch (error) {
    logErrorwithStack(error)
  }
}
