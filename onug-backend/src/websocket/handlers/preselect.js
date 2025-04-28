import { logTrace, logErrorWithStack } from "../../log"
import { validateRoom_ } from "../../validators"
import { PRESELECT } from "../../constants"
import { upsertGamestate_ } from "../../repository"

export const preselect = async (ws, message) => {
  logTrace(`select-room requested with ${JSON.stringify(message)}`)

  try {
    const { room_id, token, selected_cards } = message
    const [validity, config, errors] = await validateRoom_(room_id)

    if (!validity) return ws.send(JSON.stringify({ type: PRESELECT, success: false, errors }))

    if (Array.isArray(selected_cards)) {
      config.selected_cards = selected_cards
    }

    upsertGamestate_(room_id, "config", config)

    return ws.send(
      JSON.stringify({
        type: PRESELECT,
        success: true,
        selected_cards: config.selected_cards || [],
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
