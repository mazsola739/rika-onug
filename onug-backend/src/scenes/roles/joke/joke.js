import { SCENE } from '../../../constants'
import { getAllPlayerTokens, getRandomItemFromArray, getSceneEndTime } from '../../sceneUtils'
import { random_joke } from './joke.constants'

export const joke = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [getRandomItemFromArray(random_joke)]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
