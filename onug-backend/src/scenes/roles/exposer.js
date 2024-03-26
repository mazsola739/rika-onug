//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens } from '../../utils'

const randomExposerInstructions = [
  'exposer_flip1_text',
  'exposer_flip2_text',
  'exposer_flip3_text',
]

const randomExposerInstruction = getRandomItemFromArray(randomExposerInstructions)
const createExposer = prefix => [`${prefix}_kickoff_text`, randomExposerInstruction]

export const exposer = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createExposer(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'exposer') {
      if (card.player_original_id === 46 || (card.player_role_id === 46 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = exposer_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_exposer') {
      if (card.player_role_id === 46 && card.player_original_id === 1) {
        interaction = exposer_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
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
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
