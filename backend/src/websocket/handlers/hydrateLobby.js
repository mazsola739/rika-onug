import { HYDRATE_LOBBY } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { sendMessage } from '../../utils'
import { validateRoom } from '../../validators'

//TODO finish it
export const hydrateLobby = async (ws, message) => {
  try {
    const { room_id } = message
    logTrace(`hydrateLobby requested in ${room_id}`)
    const [validity, gamestate, errors] = await validateRoom(room_id)

    if (!validity) return sendMessage(ws, { type: HYDRATE_LOBBY, success: false, errors })

    const playerNames = Object.values(gamestate.players).map(player => player.name)

    const hydrateLobbyMessage = {
      type: HYDRATE_LOBBY,
      success: true,
      room_id: gamestate.room_id,
      selected_cards: gamestate.selected_cards,
      player_names: playerNames
    }

    sendMessage(ws, hydrateLobbyMessage)
  } catch (error) {
    logErrorWithStack(error)

    sendMessage(ws, { type: HYDRATE_LOBBY, success: false, errors: ['An unexpected error occurred. Please try again.'] })
  }
}
