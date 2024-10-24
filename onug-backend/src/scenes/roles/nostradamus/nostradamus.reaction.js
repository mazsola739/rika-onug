import { SCENE } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime } from '../../sceneUtils'
import { getNostradamusTeam } from './nostradamus.utils'

export const nostradamusReaction = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)  
  const nostradamusTeam = getNostradamusTeam(newGamestate.nostradamus_team)
  const narration = ['nostradamus_teamstart_text', nostradamusTeam]
  const actionTime = 6

  tokens.forEach((token) => { scene.push({ type: SCENE, title, token, narration })})

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
