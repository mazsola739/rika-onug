import { HYDRATE_COUNCIL, STAGES } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { readGamestate, upsertRoomState } from '../../repository'
import { getTableBoard } from '../../utils'
import { getKeys, getKnownPlayer, updatePlayer } from '../../utils/council.util'

export const hydrateCouncil = async (ws, message) => {
  try {
    logTrace(`hydrate council ${JSON.stringify(message)}`)

    const { room_id, token } = message
    const gamestate = await readGamestate(room_id)
    let newGamestate = { ...gamestate, stage: STAGES.COUNCIL }

    newGamestate = updatePlayer(newGamestate, token)

    await upsertRoomState(newGamestate)

    const player = getKnownPlayer(newGamestate, token)
    const guess_cards = [...newGamestate.selected_cards]
    const players = getTableBoard(newGamestate)

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
