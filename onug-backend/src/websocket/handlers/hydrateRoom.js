import { HYDRATE_ROOM, STAGES } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { validateRoom } from '../../validators'

export const hydrateRoom = async (ws, message) => {
  try {
    const { room_id } = message
    const [validity, gamestate, errors] = await validateRoom(room_id)



    if (!validity) {
      return ws.send(
        JSON.stringify({
          type: HYDRATE_ROOM,
          success: false,
          errors_: errors
        })
      )
    }

    const newGamestate = { ...gamestate, stage: STAGES.ROOM }

    await repo[repositoryType].upsertRoomState(newGamestate)

    const extractPlayerNames = (playersObj) => {
      return Object.values(playersObj).map(player => {
        return {
          player_name: player.name
        }
      })
    }

    const newUpdatedPlayers = extractPlayerNames(newGamestate.players)

    const hydrateRoomMessage = JSON.stringify({
      type: HYDRATE_ROOM,
      success: true,
      room_id: newGamestate.room_id,
      selected_cards: newGamestate.selected_cards,
      selected_expansions: newGamestate.selected_expansions,
      players: newUpdatedPlayers
    })

    logTrace(`sending message to client, hydrate room`, hydrateRoomMessage)

    ws.send(hydrateRoomMessage)
  } catch (error) {
    logErrorWithStack(error)

    ws.send(
      JSON.stringify({
        type: HYDRATE_ROOM,
        success: false,
        errors: ['An unexpected error occurred. Please try again.']
      })
    )
  }
}
