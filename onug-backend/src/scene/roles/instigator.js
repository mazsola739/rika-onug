//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const instigator = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['instigator_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 34) {
      interaction = instigator_interaction(newGameState, token, title)
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

export const instigator_interaction = (gameState, token, title) => {
  return {}
}
export const instigator_response = (gameState, token, selected_positions, title) => {
  return {}
}
