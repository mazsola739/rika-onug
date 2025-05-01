import { HYDRATE_TABLE, REDIRECT, STAGES } from '../../constants'
import { logTrace, logErrorWithStack } from '../../log'
import { repo, repositoryType } from '../../repository'
import { broadcast, sendMessage } from '../../utils/connections.utils'
import { validateRoom } from '../../validators'

//TODO fix if leave from vote stages
export const leaveGame = async (ws, message) => {
  logTrace(`leave-table requested with ${JSON.stringify(message)}`)
  const { room_id } = message
  try {
    const [validity, gamestate, errors] = await validateRoom(room_id)

    if (!validity) return sendMessage(ws, { type: REDIRECT, path: '/lobby', errors })

    const newGamestate = {
      ...gamestate,
      stage: STAGES.ROOM
    }
    //TODO reset other stuffs? different way to reset?

    delete newGamestate.card_positions
    delete newGamestate.mark_positions

    const playerTokens = Object.keys(newGamestate.players)

    playerTokens.forEach(token => {
      newGamestate.players[token] = {
        ...newGamestate.players[token]
      }
      delete newGamestate.players[token].player_start_card_id
      delete newGamestate.players[token].card
      delete newGamestate.players[token].player_number
      newGamestate.players[token].flag = false
    })

    await repo[repositoryType].upsertRoomState(newGamestate)

    return broadcast(room_id, { type: REDIRECT, path: `/room/${room_id}` })
  } catch (error) {
    logErrorWithStack(error)

    return sendMessage(ws, { type: HYDRATE_TABLE, success: false, errors: ['An error occurred while leaving the game. Please try again.'] })
  }
}
