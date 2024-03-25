//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens } from '../../utils'

const randomPsychicInstructions = ['psychic_view1_text', 'psychic_view2_text']
const psychicKeys = ['identifier_anyeven_text', 'identifier_anyodd_text']

const createPsychic = prefix => [`${prefix}_kickoff_text`, getRandomItemFromArray(randomPsychicInstructions), getRandomItemFromArray(psychicKeys)]

export const psychic = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createPsychic(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'psychic') {
      if (card.player_original_id === 51 || (card.player_role_id === 51 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = psychic_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_psychic') {
      if (card.player_role_id === 51 && card.player_original_id === 1) {
        interaction = psychic_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const psychic_interaction = (gameState, token, title) => {
  return {}
}

export const psychic_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
