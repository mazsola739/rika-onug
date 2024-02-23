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

    if (newGameState.players[token].card.player_original_id === 57) {
      interaction = drpeeker_interaction(newGameState, token)
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

export const drpeeker_interaction = (gameState, token) => {
  return {}
}
export const drpeeker_response = (gameState, token, selected_positions) => {
  return {}
}
