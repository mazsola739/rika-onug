import { EXPANSIONS, HYDRATE_ROOM, LEAVE_ROOM } from '../../constants'
import roomsData from '../../data/rooms.json'
import { logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { getPlayerNames } from '../../utils'
import { broadcast, removeUserFromRoom, sendMessage } from '../../utils/connections.utils'
import { validateRoom } from '../../validators'

export const leaveRoom = async (ws, message) => {
  logTrace(`leave-room requested with ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const [validity, gamestate, errors] = await validateRoom(room_id)

  if (!validity) return sendMessage(ws, { type: LEAVE_ROOM, success: false, errors })

  let newGamestate = { ...gamestate }
  const player = newGamestate.players[token]

  if (!player) return sendMessage(ws, { type: LEAVE_ROOM, success: false, errors: ['Player not found in the room.'] })

  const playerTokens = Object.keys(newGamestate.players)

  if (player.admin && playerTokens.length > 1) newGamestate.players[playerTokens[1]].admin = true

  delete newGamestate.players[token]
  newGamestate.total_players = playerTokens.length - 1

  if (playerTokens.length === 1) {
    const defaultRoom = roomsData.find(room => room.room_id === room_id)

    if (defaultRoom) {
      newGamestate.selected_cards = []
      newGamestate.selected_expansions = EXPANSIONS
      newGamestate.players = {}
      newGamestate.total_players = 0
    }
  }

  await repo[repositoryType].upsertRoomState(newGamestate)

  removeUserFromRoom(token, room_id)

  const playersInGame = getPlayerNames(newGamestate.players)

  broadcast(room_id, {
    type: HYDRATE_ROOM,
    success: true,
    selected_cards: newGamestate.selected_cards,
    selected_expansions: newGamestate.selected_expansions,
    players: playersInGame
  })

  return sendMessage(ws, { type: LEAVE_ROOM, success: true, message: 'Successfully left the room', room_id })
}
