import { HYDRATE_TABLE, REDIRECT, STAGES } from '../../constants'
import { logTrace, logErrorWithStack } from '../../log'
import { upsertRoomState_ } from '../../repository'
import { broadcast } from '../../utils/connections.utils'
import { validateRoom_ } from '../../validators'

//TODO fix if leave from vote stages
export const leaveGame = async (ws, message) => {
  logTrace(`leave-table requested with ${JSON.stringify(message)}`)
  const { room_id } = message
  try {

    const { validity, roomState, players, table, errors } = await validateRoom_(room_id)

    if (!validity) return ws.send(JSON.stringify({ type: REDIRECT, path: '/lobby', errors }))

    const newState = {
      ...roomState,
      stage: STAGES.ROOM
    }

    const newPlayers = {
      ...players
    }

    const newTable = {
      ...table
    }

    //TODO reset other stuffs? different way to reset?

    delete newTable.card_positions
    delete newTable.mark_positions

    const playerTokens = Object.keys(players.players)

    playerTokens.forEach(token => {
      newPlayers.players[token] = {
        ...newPlayers.players[token]
      }
      delete newPlayers.players[token].player_start_card_id
      delete newPlayers.players[token].card
      delete newPlayers.players[token].player_number
      newPlayers.players[token].flag = false
    })

    await upsertRoomState_(room_id, "roomState", newState)
    await upsertRoomState_(room_id, "players", newPlayers)
    await upsertRoomState_(room_id, "players", newTable)

    return broadcast(room_id, { type: REDIRECT, path: `/room/${room_id}` })
  } catch (error) {
    logErrorWithStack(error)

    return ws.send(
      JSON.stringify({
        type: HYDRATE_TABLE,
        success: false,
        errors: ['An error occurred while leaving the game. Please try again.']
      })
    )
  }
}
