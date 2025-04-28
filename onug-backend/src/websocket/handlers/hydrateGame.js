import { HYDRATE_GAME, STAGES } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { readGamestate } from '../../repository'
import { areAllPlayersReady, resetPlayerReadiness } from '../../utils'

export const hydrateGame = async (ws, message) => {
  logTrace(`hydrate game play ${JSON.stringify(message)}`)

  const { room_id } = message
  try {

    const gamestate = await readGamestate(room_id)
    const newGamestate = { ...gamestate, stage: STAGES.GAME }

    const { players } = newGamestate

    if (areAllPlayersReady(players)) {
      resetPlayerReadiness(players)
    }

    // TODO get actual scene based on scene_number and player token
    const actual_scene = newGamestate.chapter[newGamestate.chapter.length - 1]

    return ws.send(
      JSON.stringify({
        type: HYDRATE_GAME,
        success: true,
        actual_scene,
        day_mode: false,
        night_mode: true
      })
    )
  } catch (error) {
    logErrorWithStack(error)

    ws.send(
      JSON.stringify({
        type: HYDRATE_GAME,
        success: false,
        errors: ['An unexpected error occurred. Please try again.']
      })
    )
  }
}
