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

    if (newGameState.players[token].card.player_original_id === 65  || (newGameState.players[token].card.player_role_id === 65 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 65 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = rapscallion_interaction(newGameState, token, title)
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
export const rapscallion_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const interaction = {}
  scene.push({
    type: SCENE,
    title,
    token,
    interaction,
  })
  newGameState.scene = scene

  return newGameState
}
