import { SCENE } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime } from '../../sceneUtils'
import { loverInteraction } from './lovers.interaction'

export const lovers = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['lovers_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const player = newGamestate.players[token]

    if (player.player_mark === 'mark_of_love') {
      interaction = loverInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
