import { logTrace, logErrorWithStack } from "../../log"
import { validateRoom } from "../../validators"
import { PRESELECT } from "../../constants"
import { repo, repositoryType } from '../../repository'

export const preselect = async (ws, message) => {
  logTrace(`select-room requested with ${JSON.stringify(message)}`)
  const { room_id, token, selected_cards } = message
  try {

    const [validity, gamestate, errors] = await validateRoom(room_id)

    if (!validity) return ws.send(JSON.stringify({ type: PRESELECT, success: false, errors }))

    let newGamestate = { ...gamestate }

    if (Array.isArray(selected_cards)) {
      newGamestate.selected_cards = selected_cards
    }

    await repo[repositoryType].upsertRoomState(newGamestate)

    return ws.send(
      JSON.stringify({
        type: PRESELECT,
        success: true,
        selected_cards: newGamestate.selected_cards || [],
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
