import WebSocket from 'ws'
import {
  dealCards,
  hydrateCouncil,
  hydrateGame,
  hydrateGuess,
  hydrateReady,
  hydrateRoom,
  hydrateTable,
  joinRoom,
  leaveGame,
  leaveRoom,
  newbie,
  pauseGame,
  reload,
  reset,
  result,
  scene,
  startGame,
  startVote,
  stopGame,
  updateRoom,
  verdict
} from '.'
import {
  ARRIVE_COUNCIL,
  ARRIVE_GAME,
  ARRIVE_ROOM,
  ARRIVE_TABLE,
  ARRIVE_VERDICT,
  DEAL,
  JOIN_ROOM,
  LEAVE_GAME,
  LEAVE_ROOM,
  NEWBIE,
  PAUSE_GAME,
  READY,
  RELOAD,
  RESET,
  SCENE,
  START_GAME,
  START_VOTE,
  STOP_GAME,
  UPDATE_GUESS,
  UPDATE_ROOM,
  VAMPIRES_VOTE,
  VOTE
} from '../constants'
import { logError, logErrorWithStack, logTrace } from '../log'
import { vampiresvoteHydrate } from '../scenes/roles'

export const websocketServer = port => {
  try {
    const wss = new WebSocket.WebSocketServer({ port })
    wss.on('connection', function connection(ws) {
      ws.on('close', () => {
        logTrace(`client: ${ws.token} connection lost / disconnected`)
      })
      ws.onerror = function () {
        logError('Some Error occurred')
      }
      ws.on('message', async (rawMessage, client, client2) => {
        logTrace(`Received message ${rawMessage} from user ${client} ${client2}`)
        const message = JSON.parse(rawMessage)
        logTrace(`msg received: ${rawMessage}`)

        if (message.type === NEWBIE) return newbie(ws, message)
        if (ws.token !== message.token) return
        if (message.type === RELOAD) return reload(ws, message)
        if (message.type === JOIN_ROOM) return joinRoom(ws, message)
        if (message.type === LEAVE_ROOM) return leaveRoom(ws, message)
        if (message.type === UPDATE_ROOM) return updateRoom(message)
        if (message.type === DEAL) return dealCards(ws, message)
        if (message.type === LEAVE_GAME) return leaveGame(ws, message)
        if (message.type === RESET) return reset(message)
        if (message.type === ARRIVE_ROOM) return hydrateRoom(ws, message)
        if (message.type === READY) return hydrateReady(message)
        if (message.type === ARRIVE_TABLE) return hydrateTable(ws, message)
        if (message.type === START_GAME) return startGame(ws, message)
        if (message.type === VAMPIRES_VOTE) return vampiresvoteHydrate(message)
        if (message.type === ARRIVE_GAME) return hydrateGame(ws, message)
        if (message.type === PAUSE_GAME) return pauseGame(message)
        if (message.type === STOP_GAME) return stopGame(message)
        if (message.type === SCENE) return scene(ws, message)
        if (message.type === ARRIVE_COUNCIL) return hydrateCouncil(ws, message)
        if (message.type === UPDATE_GUESS) return hydrateGuess(ws, message)
        if (message.type === START_VOTE) return startVote(ws, message)
        if (message.type === VOTE) return verdict(ws, message)
        if (message.type === ARRIVE_VERDICT) return result(ws, message)
      })
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
