//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const copycat = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['copycat_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 30) {
      interaction = copycat_interaction(newGameState, token)
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

export const copycat_interaction = (gameState, token) => {
  return {}
}
export const copycat_response = (gameState, token, selected_positions) => {
  return {}
}
