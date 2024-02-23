//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../utils/scene'

const randomExposer = [
  'exposer_flip1_text',
  'exposer_flip2_text',
  'exposer_flip3_text',
]

const createExposer = (prefix) => () =>
  [`${prefix}_kickoff_text`, getRandomItemFromArray(randomExposer)]

export const exposer = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const narration = createExposer(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 46) {
      interaction = exposer_interaction(newGameState, token, title)
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

export const exposer_interaction = (gameState, token, title) => {
  return {}
}
export const exposer_response = (gameState, token, selected_positions, title) => {
  return {}
}
