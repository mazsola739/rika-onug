//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const rapscallion = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['rapscallion_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 65) {
      interaction = rapscallion_interaction(newGameState, token)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })
  })

  newGameState.scene = scene
  return newGameState
}

export const rapscallion_interaction = (gameState, token, title) => {
  return {}
}
export const rapscallion_response = (gameState, token, selected_positions, title) => {
  return {}
}
