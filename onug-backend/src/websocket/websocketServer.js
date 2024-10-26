
import WebSocket from 'ws'
import { logTrace, logError, logErrorWithStack } from '../log'
import { UPDATE_ROOM, READY, RESET, NEWBIE, JOIN_ROOM, LEAVE_ROOM, LEAVE_TABLE, ARRIVE_TABLE, ARRIVE_ROOM, START_GAME, DEAL, ARRIVE_GAME, PAUSE_GAME, STOP_GAME, RELOAD, ARRIVE_VOTE, HYDRATE_SCENE } from '../constants'
import { hydrateRoom } from './hydrateRoom'
import { reset } from './reset'
import { updateRoom } from './updateRoom'
import { newbie } from './newbie'
import { joinRoom } from './joinRoom'
import { leaveRoom } from './leaveRoom'
import { leaveTable } from './leaveTable'
import { ready } from './ready'
import { hydrateTable } from './hydrateTable'
import { startGame } from './startGame'
import { dealCards } from './dealCards'
import { hydrateGame } from './hydrateGame'
import { stopGame } from './stopGame'
import { reload } from './reload'
import { hydrateVote } from './hydrateVote'
import { pauseGame } from './pauseGame'
import { hydrateScene } from './hydrateScene'

export const websocketServer = (port) => {
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
        if (message.type === ARRIVE_TABLE)      return hydrateTable(ws, message)
        if (message.type === READY)             return ready(message)
        if (message.type === START_GAME)        return startGame(ws, message)
        if (message.type === ARRIVE_GAME)       return hydrateGame(ws, message)
        if (message.type === PAUSE_GAME)        return pauseGame(message)
        if (message.type === STOP_GAME)         return stopGame(message)
        if (message.type === HYDRATE_SCENE)     return hydrateScene(ws, message)
        if (message.type === ARRIVE_VOTE)       return hydrateVote(ws, message)
      })
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
