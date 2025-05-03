import { HYDRATE_LOBBY, STAGES } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { sendMessage } from '../../utils'
import { validateRoom } from '../../validators'

export const hydrateLobby = async (ws, message) => {
  try {
    const { room_id } = message
    logTrace(`hydrateLobby requested in ${room_id}`)
    const [validity, gamestate, errors] = await validateRoom(room_id)

    if (!validity) return sendMessage(ws, { type: HYDRATE_LOBBY, success: false, errors_: errors })

    const newGamestate = { ...gamestate, stage: STAGES.ROOM }

    await repo[repositoryType].upsertRoomState(newGamestate)

    const extractPlayerNames = playersObj => {
      return Object.values(playersObj).map(player => {
        return { player_name: player.name }
      })
    }

    const newUpdatedPlayers = extractPlayerNames(newGamestate.players)

    const hydrateLobbyMessage = {
      type: HYDRATE_LOBBY,
      success: true,
      room_id: newGamestate.room_id,
      selected_cards: newGamestate.selected_cards,
      selected_expansions: newGamestate.selected_expansions,
      players: newUpdatedPlayers
    }

    sendMessage(ws, hydrateLobbyMessage)
  } catch (error) {
    logErrorWithStack(error)

    sendMessage(ws, { type: HYDRATE_LOBBY, success: false, errors: ['An unexpected error occurred. Please try again.'] })
  }
}
