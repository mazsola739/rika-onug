import { ERROR, HYDRATE_VOTE, REDIRECT, STAGES } from '../../constants'
import { logError, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { validateRoom } from '../../validators'
import { broadcast, sendMessage } from '../../utils/connections.utils'

export const verdict = async (ws, message) => {
  const { room_id, token, selected_card_positions } = message

  logTrace(`Processing verdict in room: ${room_id}`)

  try {
    const [validity, gamestate, errors] = await validateRoom(room_id)

    if (!validity) return sendMessage(ws, { type: ERROR, success: false, errors })

    let newGamestate = { ...gamestate, stage: STAGES.VERDICT }
    newGamestate.players[token].vote = selected_card_positions || []
    newGamestate.players[token].flag = true

    const allPlayersVoted = Object.values(newGamestate.players).every(player => player.flag)

    await repo[repositoryType].upsertRoomState(newGamestate)

    if (!allPlayersVoted) {
      logTrace(`Not all players are sent accusation: ${room_id}.`)
      return sendMessage(ws, { type: HYDRATE_VOTE, success: true })
    }

    logTrace(`All players are sent accusation: ${room_id}. Redirecting to result.`)

    return broadcast(room_id, { type: REDIRECT, path: `/verdict/${room_id}` })
  } catch (error) {
    logError(`Error processing verdict in room: ${room_id}. Error: ${error.message}`)
    sendMessage(ws, { type: ERROR, success: false, message: 'An error occurred while processing the verdict. Please try again.' })
  }
}
