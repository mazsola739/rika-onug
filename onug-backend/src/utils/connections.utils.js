import { ROOM_NAMES } from '../constants'
import { logDebug, logError, logTrace } from '../log'

export const webSocketServerConnectionsPerRoom = {}
export const initWebSocketConnections = () => ROOM_NAMES.forEach(roomName => (webSocketServerConnectionsPerRoom[roomName] = {}))
initWebSocketConnections()

export const addUserToRoom = (ws, token, room_id) => {
  logDebug(`user added to ws connections: [${room_id}][${token}]`)
  webSocketServerConnectionsPerRoom[room_id][token] = ws
}

export const removeUserFromRoom = (token, room_id) => {
  logDebug(`user removed from ws connections: [${room_id}][${token}]`)
  delete webSocketServerConnectionsPerRoom[room_id][token]
}

export const broadcast = (room_id, jsonMessage) => {
  if (!webSocketServerConnectionsPerRoom?.[room_id]) return

  logDebug(`broadcast to all users in room [${room_id}] with message [${JSON.stringify(jsonMessage)}]`)
  logTrace(`active connections in room [${room_id}]: ${JSON.stringify(Object.keys(webSocketServerConnectionsPerRoom?.[room_id]))}`)

  Object.values(webSocketServerConnectionsPerRoom[room_id]).forEach(ws => ws.send(JSON.stringify(jsonMessage)))
}

export const sendMessageToPlayer = (room_id, token, jsonMessage) => {
  const playerConnection = webSocketServerConnectionsPerRoom?.[room_id]?.[token]
  if (playerConnection) {
    logDebug(`Sending message to user [${room_id}][${token}] with message [${JSON.stringify(jsonMessage)}]`)
    playerConnection.send(JSON.stringify(jsonMessage))
  } else {
    logError(`No active WebSocket connection found for user [${room_id}][${token}]`)
  }
}
