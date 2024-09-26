import { COPY_PLAYER_IDS, SCENE } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime } from '../../utils'
import { apprenticeseer_interaction } from './apprenticeseer'

export const rapscallion = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['rapscallion_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 65 || (card.player_role_id === 65 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = apprenticeseer_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}
