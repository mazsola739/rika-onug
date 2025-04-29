import { HYDRATE_TABLE, STAGES } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { upsertRoomState_ } from '../../repository'
import { getPublicPlayersInformation } from '../../utils'
import { validateRoom_ } from '../../validators'

export const hydrateTable = async (ws, message) => {
  logTrace(`hydrate game table requested with ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const { validity, roomState, players, errors } = await validateRoom_(room_id)

  if (!validity) {
    return ws.send(
      JSON.stringify({
        type: HYDRATE_TABLE,
        success: false,
        errors_: errors
      })
    )
  }
  try {

    const newState = { ...roomState, stage: STAGES.TABLE }
    await upsertRoomState_(room_id, "roomState", newState)

    const playersPublicInformations = getPublicPlayersInformation(players)

    return ws.send(
      JSON.stringify({
        type: HYDRATE_TABLE,
        success: true,
        player: {
          player_name: players.players[token].name,
          player_number: players.players[token].player_number,
          player_card_id: players.players[token].card.player_card_id,
          player_mark: players.players[token].card.player_mark,
          player_role: players.players[token].card.player_role,
          player_team: players.players[token].card.player_team
        },
        players: playersPublicInformations
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
