//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens } from '../../utils'

const random_mortician = ['mortician_1card_text', 'mortician_2cards_text']

const morticianAllKeys = [
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_oneneighbor_text',
  'identifier_yourself_text',
]

const createMortician = prefix => {
  const randomMortician = getRandomItemFromArray(random_mortician)

  return [`${prefix}_kickoff_text`, randomMortician, getRandomItemFromArray(randomMortician === 'mortician_2cards_text' ? morticianAllKeys : ['identifier_bothneighbors_text'])]
}

export const mortician = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createMortician(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'mortician') {
      if (card.player_original_id === 49 || (card.player_role_id === 49 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = mortician_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_mortician') {
      if (card.player_role_id === 49 && card.player_original_id === 1) {
        interaction = mortician_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const mortician_interaction = (gameState, token, title) => {
  return {}
}

export const mortician_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
