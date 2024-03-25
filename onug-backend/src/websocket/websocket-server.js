//@ts-check
import WebSocket from 'ws'
import { logTrace, logError, logErrorWithStack } from '../log'

import { UPDATE_ROOM, READY, RESET, NEWBIE, JOIN_ROOM, LEAVE_ROOM, LEAVE_TABLE, ARRIVE_GAME_TABLE, ARRIVE_ROOM, START_GAME, DEAL, ARRIVE_GAME_PLAY, STOP_GAME, RELOAD, SCENE, ARRIVE_GAME_VOTE } from '../constant'

import { hydrateRoom } from './hydrate-room'
import { reset } from './reset'
import { updateRoom } from './update-room'
import { newbie } from './newbie'
import { joinRoom } from './join-room'
import { leaveRoom } from './leave-room'
import { leaveTable } from './leave-table'
import { ready } from './ready'
import { hydrateGameTable } from './hydrate-game-table'
import { startGame } from './start-game'
import { dealCards } from './deal-cards'
import { hydrateGamePlay } from './hydrate-game-play'
import { stopGame } from './stop-game'
import { reload } from './reload'
import { interaction } from './interaction'
import { hydrateGameVote } from './hydrate-game-vote';

export const websocketServer = (port) => {
  try {
    const wss = new WebSocket.WebSocketServer({ port })
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

        if (message.type === NEWBIE)            return newbie(ws, message)
        if (ws.token     !== message.token)     return
        if (message.type === RELOAD)            return reload(ws, message)
        if (message.type === JOIN_ROOM)         return joinRoom(ws, message)
        if (message.type === LEAVE_ROOM)        return leaveRoom(ws, message)
        if (message.type === UPDATE_ROOM)       return updateRoom(message)
        if (message.type === DEAL)              return dealCards(ws, message)
        if (message.type === LEAVE_TABLE)       return leaveTable(ws, message)
        if (message.type === RESET)             return reset(message)
        if (message.type === ARRIVE_ROOM)       return hydrateRoom(ws, message)
        if (message.type === ARRIVE_GAME_TABLE) return hydrateGameTable(ws, message)
        if (message.type === READY)             return ready(message)
        if (message.type === START_GAME)        return startGame(ws, message)
        if (message.type === ARRIVE_GAME_PLAY)  return hydrateGamePlay(ws, message)
        if (message.type === STOP_GAME)         return stopGame(message)
        if (message.type === SCENE)             return interaction(ws, message)
        if (message.type === ARRIVE_GAME_VOTE)  return hydrateGameVote(ws, message)
      })
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
