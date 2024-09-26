import { ALL_COPY_PLAYER_IDS, SCENE } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime } from '../../utils'
import { seer_interaction } from './seer'

export const detector = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['detector_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 56 || (card.player_role_id === 56 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = seer_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}
