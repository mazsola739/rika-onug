//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const drpeeker = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['drpeeker_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 57 || (newGameState.players[token].card.role_id === 57 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.role_id === 57 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = drpeeker_interaction(newGameState, token, title)
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

export const drpeeker_interaction = (gameState, token, title) => {
  return {}
}
export const drpeeker_response = (gameState, token, selected_card_positions, title) => {
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
