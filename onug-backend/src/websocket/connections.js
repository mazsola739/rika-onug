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

const broadcastDealCards = (gameState) => {
    const { room_id, selected_cards, players } = gameState
    if (!websocketServerConnectionsPerRoom?.[room_id]) return

    logDebug(`broadcast play game to all users in room [${room_id}]`)
    logTrace(`active connections in room [${room_id}]: [${JSON.stringify(Object.keys(websocketServerConnectionsPerRoom?.[room_id]))}]`)
    
    Object.entries(websocketServerConnectionsPerRoom[room_id]).forEach(([token, ws]) => {
        const playGame = JSON.stringify({
            type: DEAL,
            success: true,
            room_id,
            selected_cards,
            player_name: players[token].name,
            player_card_id: players[token].player_card,
            player_number: players[token].player_number,
        });
        ws.send(playGame)
    })
}

module.exports = {
    initWebSocketConnections,
    addUserToRoom,
    removeUserFromRoom,
    broadcast,
    broadcastDealCards,
    websocketServerConnectionsPerRoom,
}