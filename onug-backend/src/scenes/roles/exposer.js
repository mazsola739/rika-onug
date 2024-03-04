//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../utils/scene-utils'

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

    if (prefix === 'exposer') {
      if (newGameState.players[token].card.player_original_id === 46 || (newGameState.players[token].card.player_role_id === 46 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 46 && newGameState.players[token].card.player_original_id === 64)) {
        interaction = exposer_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_exposer') {
      if (newGameState.players[token].card.player_role_id === 46 && newGameState.players[token].card.player_original_id === 1) {
        interaction = exposer_interaction(newGameState, token, title)
      }
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
export const exposer_response = (gameState, token, selected_card_positions, title) => {
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
