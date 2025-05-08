import WebSocket from 'ws'
import { ALIENS, ARRIVE_COUNCIL, ARRIVE_GAME, ARRIVE_ROOM, ARRIVE_TABLE, ARRIVE_VERDICT, DEAL, /* HYDRATE_LOBBY, */ JOIN_ROOM, LEAVE_GAME, LEAVE_ROOM, NEWBIE, PRESELECT, READY, RELOAD, RESET, SCENE, SELECT_ROOM, START_GAME, START_VOTE, STOP_GAME, UPDATE_GUESS, UPDATE_ROOM, VAMPIRES, VOTE } from '../constants'
import { logError, logErrorWithStack, logTrace } from '../log'
import { dealCards, hydrateCouncil, hydrateGame, hydrateGuess, /* hydrateLobby, */ hydrateReady, hydrateRoom, hydrateTable, joinRoom, leaveGame, leaveRoom, newbie, preselect, reload, reset, result, scene, selectRoom, startGame, startVote, stopGame, updateRoom, verdict } from './handlers'
import { decodeJsonKeys } from '../utils'
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
        const message = decodeJsonKeys(JSON.parse(rawMessage))

        // Handle messages that don't require token validation
        if (message.type === NEWBIE) return newbie(ws, message)

        // @ts-ignore
        if (ws.token !== message.token) {
          // @ts-ignore
          logError(`Invalid token for message type: ${message.type} - ws.token: ${ws.token}, message.token: ${message.token}`)
          return
        }

        // Handle messages that require token validation
        // TODO refactor handlers - make common logtrace text ect
        // TODO create hydrate lobby?
        const messageHandlers = {
          [RELOAD]: () => reload(ws, message),
          [SELECT_ROOM]: () => selectRoom(ws, message),
          [PRESELECT]: () => preselect(ws, message),
          //[HYDRATE_LOBBY]: () => hydrateLobby(ws, message),
          [JOIN_ROOM]: () => joinRoom(ws, message),
          [LEAVE_ROOM]: () => leaveRoom(ws, message),
          [UPDATE_ROOM]: () => updateRoom(message),
          [DEAL]: () => dealCards(ws, message),
          [LEAVE_GAME]: () => leaveGame(ws, message),
          [RESET]: () => reset(message),
          [ARRIVE_ROOM]: () => hydrateRoom(ws, message),
          [READY]: () => hydrateReady(ws, message),
          [ARRIVE_TABLE]: () => hydrateTable(ws, message),
          [START_GAME]: () => startGame(ws, message),
          [ARRIVE_GAME]: () => hydrateGame(ws, message),
          [STOP_GAME]: () => stopGame(message),
          [SCENE]: () => scene(ws, message),
          [ALIENS]: () => aliensVotehydrate(message),
          [VAMPIRES]: () => vampiresVotehydrate(message),
          [ARRIVE_COUNCIL]: () => hydrateCouncil(ws, message),
          [UPDATE_GUESS]: () => hydrateGuess(ws, message),
          [START_VOTE]: () => startVote(ws, message),
          [VOTE]: () => verdict(ws, message),
          [ARRIVE_VERDICT]: () => result(ws, message)
        }

        const handler = messageHandlers[message.type]

        if (handler) {
          return handler()
        }

        logError(`Unhandled message type: ${message.type}`)
        
      })
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
