import { ALL_COPY_PLAYER_IDS, SCENE } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime } from '../../utils'
import { thing_interaction } from './thing'

export const annoyinglad = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['annoyinglad_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 55 || (card.player_role_id === 55 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = thing_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}
