import { HYDRATE_COUNCIL, STAGES } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { getPublicPlayersInformation } from '../../utils'
import { getKeys, getKnownPlayer, updatePlayer } from '../../utils/council.util'
import { validateRoom } from '../../validators'

export const hydrateCouncil = async (ws, message) => {
  logTrace(`hydrate council ${JSON.stringify(message)}`)
  const { room_id, token } = message
  try {
    const [validity, gamestate, errors] = await validateRoom(room_id)

    if (!validity) return ws.send(JSON.stringify({ type: HYDRATE_COUNCIL, success: false, errors }))

    let newGamestate = { ...gamestate, stage: STAGES.COUNCIL }

    newGamestate = updatePlayer(newGamestate, token)

    await repo[repositoryType].upsertRoomState(newGamestate)

    const player = getKnownPlayer(newGamestate, token)
    const guess_cards = [...newGamestate.selected_cards]
    const players = getPublicPlayersInformation(newGamestate.players)

    return ws.send(
      JSON.stringify({
        type: HYDRATE_COUNCIL,
        success: true,
        guess_cards,
        player,
        players,
        narrations: newGamestate.narration,
        action: {
          artifacted_cards: getKeys(gamestate.artifacted_cards),
          shielded_cards: newGamestate.shielded_cards,
          show_cards: newGamestate.flipped_cards
        }
      })
    )
  } catch (error) {
    logErrorWithStack(error)

    ws.send(
      JSON.stringify({
        type: HYDRATE_COUNCIL,
        success: false,
        errors: ['An unexpected error occurred. Please try again.']
      })
    )
  }
}
