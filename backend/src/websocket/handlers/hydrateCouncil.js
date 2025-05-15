import { HYDRATE_COUNCIL, STAGES } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { getPublicPlayersInformation, sendMessage } from '../../utils'
import { getKeys, getKnownPlayer, updatePlayer } from '../../utils/council.util'
import { validateRoom } from '../../validators'

//TODO personal history
export const hydrateCouncil = async (ws, message) => {
  const { room_id, token } = message
  logTrace(`hydrate council in ${room_id}`)
  try {
    const [validity, gamestate, errors] = await validateRoom(room_id)

    if (!validity) return sendMessage(ws, { type: HYDRATE_COUNCIL, success: false, errors })

    let newGamestate = { ...gamestate, stage: STAGES.COUNCIL }

    newGamestate = updatePlayer(newGamestate, token)

    await repo[repositoryType].upsertRoomState(newGamestate)

    const player = getKnownPlayer(newGamestate, token)
    const guess_cards = [...newGamestate.selected_cards]
    const players = getPublicPlayersInformation(newGamestate.players)

    return sendMessage(ws, {
      type: HYDRATE_COUNCIL,
      success: true,
      guess_cards,
      player,
      players,
      narrations: newGamestate.scenes.narration,
      action: {
        artifacted_cards: getKeys(gamestate.positions.artifacted_cards),
        shielded_cards: newGamestate.positions.shielded_cards,
        show_cards: newGamestate.positions.flipped_cards
      }
    })
  } catch (error) {
    logErrorWithStack(error)

    sendMessage(ws, { type: HYDRATE_COUNCIL, success: false, errors: ['An unexpected error occurred. Please try again.'] })
  }
}
