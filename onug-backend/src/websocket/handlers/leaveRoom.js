import { HYDRATE_ROOM, LEAVE_ROOM } from '../../constants'
import roomsData from '../../data/rooms.json'
import { logTrace } from '../../log'
import { readGamestate, upsertRoomState } from '../../repository'
import { getPlayerNames } from '../../utils'
import { broadcast, removeUserFromRoom } from '../../utils/connections.utils'

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
        errors: ['Player not found in the room.']
      })
    )
  }

  const playerTokens = Object.keys(gamestate.players)

  if (player.admin && playerTokens.length > 1) gamestate.players[playerTokens[1]].admin = true

  gamestate.available_names.push(player.name)
  delete gamestate.players[token]

  if (playerTokens.length === 1) {
    const defaultRoom = roomsData.find(room => room.room_id === room_id)

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

  const players = getPlayerNames(gamestate)

  broadcast(room_id, {
    type: HYDRATE_ROOM,
    success: true,
    selected_cards: gamestate.selected_cards,
    selected_expansions: gamestate.selected_expansions,
    players
  })

  return ws.send(
    JSON.stringify({
      type: LEAVE_ROOM,
      success: true,
      message: 'Successfully left the room',
      room_id
    })
  )
}
