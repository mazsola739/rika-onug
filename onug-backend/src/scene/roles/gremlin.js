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

    if (newGameState.players[token].card.player_original_id === 33) {
      interaction = gremlin_interaction(newGameState, token)
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

export const gremlin_interaction = (gameState, token) => {
  return {}
}
export const gremlin_response = (gameState, token, selected_positions) => {
  return {}
}
