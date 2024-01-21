const { DEAL } = require('../constant/ws')
const roomNames = require('../data/room_names.json')
const { logDebug, logTrace } = require('../log')

const websocketServerConnectionsPerRoom = {}
const initWebSocketConnections = () => roomNames.forEach(roomName => websocketServerConnectionsPerRoom[roomName] = {})
initWebSocketConnections()

const addUserToRoom = (ws, token, room_id) => {
    logDebug(`user added to ws connections: [${room_id}][${token}]`)
    websocketServerConnectionsPerRoom[room_id][token] = ws
}

const removeUserFromRoom = (token, room_id) => {
  logDebug(`user removed from ws connections: [${room_id}][${token}]`)
  delete websocketServerConnectionsPerRoom[room_id][token]
}

const broadcast = (room_id, jsonMessage) => {
    if (!websocketServerConnectionsPerRoom?.[room_id]) return

    logDebug(`broadcast to all users in room [${room_id}] with message [${JSON.stringify(jsonMessage)}]`)
    logTrace(`active connections in room [${room_id}]: [${JSON.stringify(Object.keys(websocketServerConnectionsPerRoom?.[room_id]))}]`)

    Object.values(websocketServerConnectionsPerRoom[room_id]).forEach(ws => {
        ws.send(JSON.stringify(jsonMessage))
    })
}

const sendInteractionSceneToPlayer = (gameState) => {
    const interactionScenes = gameState.interactionScenes?.[gameState.scene_number]
    const wsInRoom = websocketServerConnectionsPerRoom?.[gameState.room_id]
    interactionScenes.forEach(interactionScene => {
        logTrace(`interactionScene.sent: ${interactionScene.sent}`)
        !interactionScene.sent && wsInRoom?.[interactionScene.token]?.send(JSON.stringify(interactionScene))
    })
}

module.exports = {
    websocketServerConnectionsPerRoom,
    initWebSocketConnections,
    addUserToRoom,
    removeUserFromRoom,
    broadcast,
    sendInteractionSceneToPlayer,
}