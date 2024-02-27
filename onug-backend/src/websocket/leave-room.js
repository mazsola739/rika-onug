//@ts-check
import roomsData from '../data/rooms.json'
import { upsertRoomState, readGameState } from '../repository'
import { logTrace } from '../log'
import { LEAVE_ROOM } from '../constant/ws'
import { removeUserFromRoom } from './connections'

export const leaveRoom = async (ws, message) => {
  logTrace(`leave-room requested with ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gameState = await readGameState(room_id)
  const player = gameState.players[token]

  if (!player) {
    return ws.send(
      JSON.stringify({
        type: LEAVE_ROOM,
        success: false,
        errors: ["Player not found in the room."],
      })
    )
  }

  const playerTokens = Object.keys(gameState.players)

  if (player.admin && playerTokens.length > 1) gameState.players[playerTokens[1]].admin = true

  gameState.available_names.push(player.name)
  delete gameState.players[token]

  if (playerTokens.length === 1) {
    const defaultRoom = roomsData.find((room) => room.room_id === room_id)

    if (defaultRoom) {
      gameState.selected_cards = defaultRoom.selected_cards
      gameState.players = {}
      gameState.scene_number = 0
      gameState.closed = false
      gameState.available_names = [...defaultRoom.available_names]
      delete gameState.card_positions
      delete gameState.mark_positions
    }
  }

  await upsertRoomState(gameState)

  removeUserFromRoom(token, room_id)
  
  return ws.send(
    JSON.stringify({
      type: LEAVE_ROOM,
      success: true,
      message: "Successfully left the room",
      room_id,
    })
  )
}
