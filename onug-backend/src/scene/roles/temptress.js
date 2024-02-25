//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const temptress = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['temptress_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 69) {
      interaction = temptress_interaction(newGameState, token, title)
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

export const temptress_interaction = (gameState, token, title) => {
  return {}
}
export const temptress_response = (gameState, token, selected_card_positions, title) => {
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
