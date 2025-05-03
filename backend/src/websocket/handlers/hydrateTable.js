import { HYDRATE_TABLE, STAGES } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { getPublicPlayersInformation, sendMessage } from '../../utils'
import { validateRoom } from '../../validators'

export const hydrateTable = async (ws, message) => {
  const { room_id, token } = message
  logTrace(`hydrate game table requested in ${room_id}`)
  const [validity, gamestate, errors] = await validateRoom(room_id)

  if (!validity) return sendMessage(ws, { type: HYDRATE_TABLE, success: false, errors_: errors })

  try {
    const newGamestate = { ...gamestate, stage: STAGES.TABLE }
    await repo[repositoryType].upsertRoomState(newGamestate)

    const playersPublicInformations = getPublicPlayersInformation(newGamestate.players) //TODO save into gamestate?

    return sendMessage(ws, {
      type: HYDRATE_TABLE,
      success: true,
      player: {
        player_name: newGamestate.players[token].name,
        player_number: newGamestate.players[token].player_number,
        player_card_id: newGamestate.players[token].card.player_card_id,
        player_mark: newGamestate.players[token].card.player_mark,
        player_role: newGamestate.players[token].card.player_role,
        player_team: newGamestate.players[token].card.player_team
      },
      players: playersPublicInformations
    })
  } catch (error) {
    logErrorWithStack(error)

    sendMessage(ws, { type: HYDRATE_TABLE, success: false, errors: ['An unexpected error occurred. Please try again.'] })
  }
}
