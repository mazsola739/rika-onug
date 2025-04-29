import { HYDRATE_ROOM, JOIN_ROOM } from '../../constants'
import { logErrorWithStack, logTrace, logWarn } from '../../log'
import { upsertRoomState_ } from '../../repository'
import { validateRoom_ } from '../../validators'
import { addUserToRoom, broadcast } from '../../utils/connections.utils'

export const joinRoom = async (ws, message) => {
  logTrace(`join-room requested with ${JSON.stringify(message)}`)
  const { room_id, nickname, token } = message

  try {
    const [validity, config, players] = await validateRoom_(room_id)

    if (!validity) {
      return ws.send(
        JSON.stringify({
          type: JOIN_ROOM,
          success: false,
          errors: ['Invalid room. Please try again.']
        })
      )
    }

    if (players.total_players >= 12) {
      return ws.send(
        JSON.stringify({
          type: JOIN_ROOM,
          success: false,
          errors: ['Room is full. No more players can join.']
        })
      )
    }

    const playerTokens = Object.keys(players.players)
    const updatedPlayers = {
      ...players,
      players: {
        ...players.players,
        [token]: { name: nickname, admin: playerTokens.length === 0, flag: false }
      },
      total_players: playerTokens.length + 1
    }

    const updatedConfig = {
      ...config,
      nicknames: Object.values(updatedPlayers.players).map(player => player.name)
    }

    try {
      await upsertRoomState_(room_id, 'players', updatedPlayers)
      await upsertRoomState_(room_id, 'config', updatedConfig)

      const extractPlayerNames = (playersObj) => {
        return Object.values(playersObj).map(player => {
          return {
            player_name: player.name
          }
        })
      }

      const newUpdatedPlayers = extractPlayerNames(updatedPlayers.players)

      broadcast(room_id, {
        type: HYDRATE_ROOM,
        room_id,
        success: true,
        selected_cards: updatedConfig.selected_cards,
        selected_expansions: updatedConfig.selected_expansions,
        players: newUpdatedPlayers
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
