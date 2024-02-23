//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

const createPickpocket = (prefix) => () =>
  [`${prefix}_kickoff_text`, 'pickpocket_kickoff2_text']

export const pickpocket = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const narration = createPickpocket(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 36) {
      interaction = pickpocket_interaction(newGameState, token, title)
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

export const pickpocket_interaction = (gameState, token, title) => {
  return {}
}
export const pickpocket_response = (gameState, token, selected_positions, title) => {
  return {}
}
