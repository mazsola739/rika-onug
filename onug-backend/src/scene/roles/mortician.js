//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../utils/scene'

const random_mortician = ['mortician_1card_text', 'mortician_2cards_text']

const morticianAllKeys = [
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_oneneighbor_text',
  'identifier_yourself_text',
]

const createMortician = (prefix) => () => {
  const randomMortician = getRandomItemFromArray(random_mortician)
  return [
    `${prefix}_kickoff_text`,
    randomMortician,
    getRandomItemFromArray(
      randomMortician === 'mortician_2cards_text'
        ? morticianAllKeys
        : ['identifier_bothneighbors_text']
    ),
  ]
}

export const mortician = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const narration = createMortician(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 36) {
      interaction = mortician_interaction(newGameState, token, title)
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

export const mortician_interaction = (gameState, token, title) => {
  return {}
}
export const mortician_response = (gameState, token, selected_positions, title) => {
  return {}
}
