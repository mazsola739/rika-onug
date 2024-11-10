import { HYDRATE_TABLE, STAGES } from '../constants'
import { logErrorWithStack, logTrace } from '../log'
import { readGamestate } from '../repository'
import { getTableBoard } from '../utils'

export const hydrateTable = async (ws, message) => {
  try {
    logTrace(`hydrate game table requested with ${JSON.stringify(message)}`)

    const { room_id, token } = message
    const gamestate = await readGamestate(room_id)
    const newGamestate = {...gamestate, stage: STAGES.TABLE}

    const playersByToken = newGamestate.players
    const player = playersByToken[token]
    const playerCard = player.card
    const players = getTableBoard(newGamestate)

    return ws.send(
      JSON.stringify({
        type: HYDRATE_TABLE,
        success: true,
        player: {
          player_name: player?.name,
          player_number: player?.player_number,
          player_card_id: playerCard.player_card_id,
          player_mark: playerCard.player_mark,
          player_role: playerCard.player_role,
          player_team: playerCard.player_team
        },
        players
      })
    )
  } catch (error) {
    logErrorWithStack(error)

    ws.send(
      JSON.stringify({
        type: HYDRATE_TABLE,
        success: false,
        errors: ['An unexpected error occurred. Please try again.']
      })
    )
  }
}
