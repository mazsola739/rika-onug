//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils'

export const rapscallion = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['rapscallion_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 65 || (card.player_role_id === 65 && copyPlayerIds.includes(card.player_original_id))) {
      interaction = rapscallion_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const rapscallion_interaction = (gameState, token, title) => {
  return {}
}

export const rapscallion_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  
  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
