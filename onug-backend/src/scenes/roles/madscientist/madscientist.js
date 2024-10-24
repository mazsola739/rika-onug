import { SCENE } from '../../../constants'
import { getAllPlayerTokens, getRandomItemFromArray, getSceneEndTime } from '../../sceneUtils'
import { random_madscientist_intro, random_madscientist_therefore, random_madscientist_result, random_madscientist_transition } from './madscientist.constants'

export const madscientist = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    'madscientist_kickoff_text',
    getRandomItemFromArray(random_madscientist_intro),
    getRandomItemFromArray(random_madscientist_therefore),
    getRandomItemFromArray(random_madscientist_result),
    getRandomItemFromArray(random_madscientist_transition),
    'madscientist_close_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
