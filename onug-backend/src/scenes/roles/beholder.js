//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene-utils'

export const beholder = (gameState, title, hasSeer, hasApprenticeSeer, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_beholder_kickoff_text'
      : 'beholder_seer_kickoff_text',
    hasSeer && hasApprenticeSeer
      ? 'beholder_seer_apprenticeseer_kickoff_text'
      : hasSeer
      ? 'beholder_seer_kickoff_text'
      : 'beholder_apprenticeseer_kickoff_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 73 || (newGameState.players[token].card.player_role_id === 73 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 73 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = beholder_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const beholder_interaction = (gameState, token, title) => {
  return {}
}

export const beholder_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  
  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
