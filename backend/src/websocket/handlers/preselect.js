import { logTrace, logErrorWithStack } from '../../log'
import { validateRoom } from '../../validators'
import { PRESELECT } from '../../constants'
import { repo, repositoryType } from '../../repository'
import { sendMessage } from '../../utils'

//TODO fix Lobby related infos here
export const preselect = async (ws, message) => {
  const { room_id, token, selected_cards } = message
  logTrace(`select-room requested in ${room_id}`)
  try {
    const [validity, gamestate, errors] = await validateRoom(room_id)

    if (!validity) return sendMessage(ws, { type: PRESELECT, success: false, errors })

    let newGamestate = { ...gamestate }

    if (Array.isArray(selected_cards)) {
      newGamestate.selected_cards = selected_cards
    }

    await repo[repositoryType].upsertRoomState(newGamestate)

    return sendMessage(ws, { type: PRESELECT, success: true, selected_cards: newGamestate.selected_cards || [], token })
  } catch (error) {
    logErrorWithStack(error)

    sendMessage(ws, { type: PRESELECT, success: false, errors: ['An unexpected error occurred. Please try again.'] })
  }
}
