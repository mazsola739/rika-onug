//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils'

export const drpeeker = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['drpeeker_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 57 || (card.player_role_id === 57 && copyPlayerIds.includes(card.player_original_id))) {
      interaction = drpeeker_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const drpeeker_interaction = (gameState, token, title) => {
  return {}
}

export const drpeeker_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
