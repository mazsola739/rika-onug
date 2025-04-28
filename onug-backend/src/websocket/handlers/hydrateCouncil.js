import { HYDRATE_COUNCIL, STAGES } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { readGamestate, upsertRoomState, upsertGamestate_ } from '../../repository'
import { getPublicPlayersInformation } from '../../utils'
import { getKeys, getKnownPlayer, updatePlayer } from '../../utils/council.util'
import { validateRoom_ } from '../../validators'

export const hydrateCouncil = async (ws, message) => {
  try {
    logTrace(`hydrate council ${JSON.stringify(message)}`)

    const { room_id, token } = message
    const gamestate = await readGamestate(room_id)
    const [validity, config, errors] = await validateRoom_(room_id)

    if (!validity) return ws.send(JSON.stringify({ type: HYDRATE_COUNCIL, success: false, errors }))

    let newGamestate = { ...gamestate, stage: STAGES.COUNCIL }
    let newConfig = { ...config, stage: STAGES.COUNCIL }

    newGamestate = updatePlayer(newGamestate, token)

    await upsertRoomState(newGamestate)
    await upsertGamestate_(room_id, "config", newConfig)

    const player = getKnownPlayer(newGamestate, token)
    const guess_cards = [...newConfig.selected_cards]
    const players = getPublicPlayersInformation(newGamestate)

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
