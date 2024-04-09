//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime } from '../../utils'
import { mysticwolf_interaction } from './mysticwolf'

export const drpeeker = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['drpeeker_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 57 || (card.player_role_id === 57 && copyPlayerIds.includes(card.player_original_id))) {
      interaction = mysticwolf_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}
