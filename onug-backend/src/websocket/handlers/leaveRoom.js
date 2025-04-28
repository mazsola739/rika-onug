import { EXPANSIONS, HYDRATE_ROOM, LEAVE_ROOM } from '../../constants'
import roomsData from '../../data/rooms.json'
import { logTrace } from '../../log'
import { upsertRoomData_ } from '../../repository'
import { getPlayerNames } from '../../utils'
import { broadcast, removeUserFromRoom } from '../../utils/connections.utils'
import { validateRoom_ } from '../../validators'

export const leaveRoom = async (ws, message) => {
  logTrace(`leave-room requested with ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const [validity, config, players] = await validateRoom_(room_id)
  console.log(validity)

  const player = players.players[token]

  if (!player) {
    return ws.send(
      JSON.stringify({
        type: LEAVE_ROOM,
        success: false,
        errors: ['Player not found in the room.']
      })
    )
  }

  const playerTokens = Object.keys(players.players)

  if (player.admin && playerTokens.length > 1) players.players[playerTokens[1]].admin = true

  delete players.players[token]
  players.total_players = playerTokens.length - 1

  if (playerTokens.length === 1) {
    const defaultRoom = roomsData.find(room => room.room_id === room_id)

    if (defaultRoom) {
      config.selected_cards = []
      config.selected_expansions = EXPANSIONS
      players.players = {}
      players.total_players = 0
    }
  }

  await upsertRoomData_(room_id, 'config', config)
  await upsertRoomData_(room_id, 'players', players)

  removeUserFromRoom(token, room_id)

  const playersInGame = getPlayerNames(players.players)

  broadcast(room_id, {
    type: HYDRATE_ROOM,
    success: true,
    selected_cards: config.selected_cards,
    selected_expansions: config.selected_expansions,
    players: playersInGame
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
