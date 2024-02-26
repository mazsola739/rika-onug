//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

const createGremlin = (prefix) => () =>
  [`${prefix}_kickoff_text`, 'gremlin_kickoff2_text']

export const gremlin = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const narration = createGremlin(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 33 || (newGameState.players[token].card.role_id === 33 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.role_id === 33 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = gremlin_interaction(newGameState, token, title)
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

export const gremlin_interaction = (gameState, token, title) => {
  return {}
}
export const gremlin_response = (gameState, token, selected_card_positions, title) => {
  return {}
}
