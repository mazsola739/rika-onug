import WebSocket from 'ws'
import { ALIENS, ARRIVE_COUNCIL, ARRIVE_GAME, ARRIVE_ROOM, ARRIVE_TABLE, ARRIVE_VERDICT, DEAL, JOIN_ROOM, LEAVE_GAME, LEAVE_ROOM, NEWBIE, PRESELECT, READY, RELOAD, RESET, SCENE, SELECT_ROOM, START_GAME, START_VOTE, STOP_GAME, UPDATE_GUESS, UPDATE_ROOM, VAMPIRES, VOTE } from '../constants'
import { logError, logErrorWithStack, logTrace } from '../log'
import { dealCards, hydrateCouncil, hydrateGame, hydrateGuess, hydrateReady, hydrateRoom, hydrateTable, joinRoom, leaveGame, leaveRoom, newbie, preselect, reload, reset, result, scene, selectRoom, startGame, startVote, stopGame, updateRoom, verdict } from './handlers'
import { aliensVotehydrate } from '../scenes/roles/aliens/aliens.voteHydrate'
import { vampiresVotehydrate } from '../scenes/roles/vampires/vampires.voteHydrate'

export const websocketServer = port => {
  try {
    const wss = new WebSocket.WebSocketServer({ port })

    wss.on('connection', function connection(ws) {
      ws.on('close', () => {
        // @ts-ignore
        logTrace(`client: ${ws.token} connection lost / disconnected`)
      })
      ws.onerror = function () {
        logError('Some Error occurred')
      }
      ws.on('message', async (rawMessage, client, client2) => {
        logTrace(`Received message ${rawMessage} from user ${client} ${client2}`)
        const message = JSON.parse(rawMessage)
        logTrace(`msg received: ${rawMessage}`)

        // Handle messages that don't require token validation
        if (message.type === NEWBIE) return newbie(ws, message)

        // @ts-ignore
        if (ws.token !== message.token) {
          // @ts-ignore
          logError(`Invalid token for message type: ${message.type} - ws.token: ${ws.token}, message.token: ${message.token}`)
          return
        }

        // Handle messages that require token validation
        // TODO refactor handlers
        switch (message.type) {
          case RELOAD:
            return reload(ws, message)
          case JOIN_ROOM:
            return joinRoom(ws, message)
          case SELECT_ROOM:
            return selectRoom(ws, message)
          case PRESELECT:
            return preselect(ws, message)
          case LEAVE_ROOM:
            return leaveRoom(ws, message)
          case UPDATE_ROOM:
            return updateRoom(message)
          case DEAL:
            return dealCards(ws, message)
          case LEAVE_GAME:
            return leaveGame(ws, message)
          case RESET:
            return reset(message)
          case ARRIVE_ROOM:
            return hydrateRoom(ws, message)
          case READY:
            return hydrateReady(message)
          case ARRIVE_TABLE:
            return hydrateTable(ws, message)
          case START_GAME:
            return startGame(ws, message)
          case ARRIVE_GAME:
            return hydrateGame(ws, message)
          case STOP_GAME:
            return stopGame(message)
          case SCENE:
            return scene(ws, message)
          case ALIENS:
            return aliensVotehydrate(message)
          case VAMPIRES:
            return vampiresVotehydrate(message)
          case ARRIVE_COUNCIL:
            return hydrateCouncil(ws, message)
          case UPDATE_GUESS:
            return hydrateGuess(ws, message)
          case START_VOTE:
            return startVote(ws, message)
          case VOTE:
            return verdict(ws, message)
          case ARRIVE_VERDICT:
            return result(ws, message)
          default:
            logError(`Unhandled message type: ${message.type}`)
        }
      })
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
