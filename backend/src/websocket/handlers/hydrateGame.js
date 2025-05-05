import { HYDRATE_GAME, STAGES } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { areAllPlayersReady, resetPlayerReadiness, sendMessage } from '../../utils'

export const hydrateGame = async (ws, message) => {
  const { room_id } = message
  logTrace(`hydrate game play in ${room_id}`)
  try {
    const gamestate = await repo[repositoryType].readGamestate(room_id)
    const newGamestate = { ...gamestate, stage: STAGES.GAME }

    const { players } = newGamestate

    if (areAllPlayersReady(players)) {
      resetPlayerReadiness(players)
    }

    // TODO get actual scene based on scene_number and player token
    const actual_scene = newGamestate.scenes.chapter[newGamestate.scenes.chapter.length - 1]

    return sendMessage(ws, { type: HYDRATE_GAME, success: true, actual_scene, day_mode: false, night_mode: true })
  } catch (error) {
    logErrorWithStack(error)

    sendMessage(ws, { type: HYDRATE_GAME, success: false, errors: ['An unexpected error occurred. Please try again.'] })
  }
}
