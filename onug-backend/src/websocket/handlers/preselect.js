import { logTrace, logErrorWithStack } from "../../log"
import { validateRoom } from "../../validators"
import { PRESELECT } from "../../constants"

export const preselect = async (ws, message) => {
  logTrace(`select-room requested with ${JSON.stringify(message)}`)

  try {
    const { room_id, token, selected_cards } = message

    const [roomIdValid, gamestate] = await validateRoom(room_id)

    if (!roomIdValid) {
      return ws.send(
        JSON.stringify({
          type: PRESELECT,
          success: false,
          errors: ["Room is invalid."]
        })
      )
    }

    if (Array.isArray(selected_cards)) {
      gamestate.selected_cards = selected_cards
    }

    return ws.send(
      JSON.stringify({
        type: PRESELECT,
        success: true,
        selected_cards: gamestate.selected_cards || [],
        token
      })
    )
  } catch (error) {
    logErrorWithStack(error)

    ws.send(
      JSON.stringify({
        type: PRESELECT,
        success: false,
        errors: ["An unexpected error occurred. Please try again."]
      })
    )
  }
}
