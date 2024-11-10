import { ERROR, REDIRECT } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

export const verdict = async (ws, message) => {
  const { room_id, token, selected_card_positions } = message
  logTrace(`Processing verdict in room: ${room_id}`)

  try {
    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)
    if (!roomIdValid) {
      return ws.send(JSON.stringify({ type: ERROR, success: false, errors }))
    }

    let newGamestate = { ...gamestate }
    newGamestate.players[token].vote = selected_card_positions || []
    newGamestate.players[token].flag = true

    const allPlayersVoted = Object.values(newGamestate.players).every(player => player.flag)

    if (allPlayersVoted) {
      logTrace(`All players are sent accusation: ${room_id}. Redirecting to result.`)
      await upsertRoomState(newGamestate)
      broadcast(JSON.stringify({ type: REDIRECT, path: `/verdict/${room_id}` }))
    }

    await upsertRoomState(newGamestate)
    return newGamestate
  } catch (error) {
    logError(`Error processing verdict in room: ${room_id}. Error: ${error.message}`)
    ws.send(
      JSON.stringify({
        type: ERROR,
        success: false,
        message: 'An error occurred while processing the verdict. Please try again.'
      })
    )
  }
}
