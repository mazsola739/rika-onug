import { logTrace, logErrorWithStack } from "../../log"
import { validateRoom_ } from "../../validators"
import { PRESELECT } from "../../constants"
import { upsertRoomState_ } from "../../repository"

export const preselect = async (ws, message) => {
  logTrace(`select-room requested with ${JSON.stringify(message)}`)
  const { room_id, token, selected_cards } = message
  try {

    const { validity, roomState, errors } = await validateRoom_(room_id)

    if (!validity) return ws.send(JSON.stringify({ type: PRESELECT, success: false, errors }))

    if (Array.isArray(selected_cards)) {
      roomState.selected_cards = selected_cards
    }

    upsertRoomState_(room_id, "roomState", roomState)

    return ws.send(
      JSON.stringify({
        type: PRESELECT,
        success: true,
        selected_cards: roomState.selected_cards || [],
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
