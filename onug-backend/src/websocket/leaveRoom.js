import roomsData from '../data/rooms.json'
import { upsertRoomState, readGamestate } from '../repository'
import { logTrace } from '../log'
import { LEAVE_ROOM } from '../constants'
import { removeUserFromRoom } from './connections'

export const leaveRoom = async (ws, message) => {
  logTrace(`leave-room requested with ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gamestate = await readGamestate(room_id)
  const player = gamestate.players[token]

  if (!player) {
    return ws.send(
      JSON.stringify({
        type: LEAVE_ROOM,
        success: false,
        errors: ["Player not found in the room."],
      })
    )
  }

  const playerTokens = Object.keys(gamestate.players)

  if (player.admin && playerTokens.length > 1) gamestate.players[playerTokens[1]].admin = true

  gamestate.available_names.push(player.name)
  delete gamestate.players[token]

  if (playerTokens.length === 1) {
    const defaultRoom = roomsData.find((room) => room.room_id === room_id)

    if (defaultRoom) {
      gamestate.selected_cards = defaultRoom.selected_cards
      gamestate.selected_expansions = defaultRoom.selected_expansions
      gamestate.players = {}
      gamestate.scene_number = 0
      gamestate.closed = false
      gamestate.available_names = [...defaultRoom.available_names]
      delete gamestate.card_positions
      delete gamestate.mark_positions
    }
  }

  await upsertRoomState(gamestate)

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
