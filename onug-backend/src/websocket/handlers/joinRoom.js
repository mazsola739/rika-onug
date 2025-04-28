import { HYDRATE_ROOM, JOIN_ROOM, STAGES } from '../../constants'
import roomsData from '../../data/rooms_new.json'
import configData from '../../data/gamestate_config.json'
import { logErrorWithStack, logTrace, logWarn } from '../../log'
import { upsertRoomData_ } from '../../repository'
import { getPlayerNames_ } from '../../utils'
import { validateRoom_ } from '../../validators'
import { addUserToRoom, broadcast } from '../../utils/connections.utils'

export const joinRoom = async (ws, message) => {
  logTrace(`join-room requested with ${JSON.stringify(message)}`)

  try {
    const { room_id, nickname, token } = message
    const room_index = roomsData.findIndex(room => room.room_id === room_id)

    if (room_index === -1) {
      return ws.send(
        JSON.stringify({
          type: JOIN_ROOM,
          success: false,
          errors: ['Room does not exist.']
        })
      )
    }

    const [validity, config, players] = await validateRoom_(room_id)

    if (players.total_players >= 12) {
      return ws.send(
        JSON.stringify({
          type: JOIN_ROOM,
          success: false,
          errors: ['Room is full. No more players can join.']
        })
      )
    }

    if (!validity) {
      const newConfig = {
        ...config,
        selected_cards: configData.selected_cards,
        selected_expansions: configData.selected_expansions,
        stage: STAGES.ROOM,
      }

      const newPlayers = {
        ...players,
        players: { [token]: { name: nickname, admin: Object.keys(players.players).length === 0, flag: false } }
      }

      try {
        await upsertRoomData_(room_id, 'config', newConfig)
        await upsertRoomData_(room_id, 'players', newPlayers)
      } catch (error) {
        logWarn(`Error updating room state for new room: ${error.message}`)
        return ws.send(
          JSON.stringify({
            type: JOIN_ROOM,
            success: false,
            errors: ['Failed to save room state. Please try again.']
          })
        )
      }
    } else {
      const updatedPlayers = {
        ...players,
        players: { [token]: { name: nickname, admin: Object.keys(players.players).length === 0, flag: false } }
      }

      try {
        await upsertRoomData_(room_id, 'players', updatedPlayers)
      } catch (error) {
        logWarn(`Error updating players for room: ${error.message}`)
        return ws.send(
          JSON.stringify({
            type: JOIN_ROOM,
            success: false,
            errors: ['Failed to save player data. Please try again.']
          })
        )
      }
    }

    addUserToRoom(ws, token, room_id)

    const playersInGame = getPlayerNames_(players.players)

    broadcast(room_id, {
      type: HYDRATE_ROOM,
      success: true,
      selected_cards: config.selected_cards,
      selected_expansions: config.selected_expansions,
      players: playersInGame
    })

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
