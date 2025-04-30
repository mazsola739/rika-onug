import { HYDRATE_ROOM, JOIN_ROOM } from '../../constants'
import { logErrorWithStack, logTrace, logWarn } from '../../log'
import { upsertRoomState } from '../../repository'
import { validateRoom } from '../../validators'
import { addUserToRoom, broadcast } from '../../utils/connections.utils'

export const joinRoom = async (ws, message) => {
  logTrace(`join-room requested with ${JSON.stringify(message)}`)
  const { room_id, nickname, token } = message

  try {
    const [validity, gamestate, errors] = await validateRoom(room_id)
    console.log(errors)

    if (!validity) return ws.send(JSON.stringify({ type: JOIN_ROOM, success: false, errors: ['Invalid room. Please try again.'] }))

    if (gamestate.total_players >= 12) return ws.send(JSON.stringify({ type: JOIN_ROOM, success: false, errors: ['Room is full. No more players can join.'] }))

    const playerTokens = Object.keys(gamestate.players)
    const newGamstate = {
      ...gamestate,
      players: {
        ...gamestate.players,
        [token]: { name: nickname, admin: playerTokens.length === 0, flag: false }
      },
      total_players: playerTokens.length + 1
    }

    const updatedConfig = {
      ...gamestate,
      nicknames: Object.values(newGamstate.players).map(player => player.name)
    }

    try {
      await upsertRoomState(newGamstate)

      const extractPlayerNames = (playersObj) => {
        return Object.values(playersObj).map(player => {
          return {
            player_name: player.name
          }
        })
      }

      const newPlayers = extractPlayerNames(newGamstate.players)

      broadcast(room_id, {
        type: HYDRATE_ROOM,
        room_id,
        success: true,
        selected_cards: updatedConfig.selected_cards,
        selected_expansions: updatedConfig.selected_expansions,
        players: newPlayers
      })
    } catch (error) {
      logWarn(`Error updating room state: ${error.message}`)
      return ws.send(
        JSON.stringify({
          type: JOIN_ROOM,
          success: false,
          errors: ['Failed to save room state. Please try again.']
        })
      )
    }

    addUserToRoom(ws, token, room_id)

    return ws.send(
      JSON.stringify({
        type: JOIN_ROOM,
        success: true,
        message: 'Successfully joined',
        room_id,
        player: { name: nickname }
      })
    )
  } catch (error) {
    logErrorWithStack(error)

    ws.send(
      JSON.stringify({
        type: JOIN_ROOM,
        success: false,
        errors: ['An unexpected error occurred. Please try again.']
      })
    )
  }
}
