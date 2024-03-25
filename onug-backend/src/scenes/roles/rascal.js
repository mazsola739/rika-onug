//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens } from '../../utils'

const randomRascalInstructions = [
  'rascal_idiot_text',
  'rascal_troublemaker_text',
  'rascal_witch_text',
  'rascal_drunk_text',
  'rascal_robber_text',
]
const rascalAnyOneKeys = [
  'identifier_higher_text',
  'identifier_lower_text',
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_oneneighbor_text',
  'identifier_center_text',
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
]
const rascalAnyTwoKeys = [
  'identifier_any2_text',
  'identifier_any2even_text',
  'identifier_any2odd_text',
  'identifier_any2higher_text',
  'identifier_any2lower_text',
  'identifier_2leftneighbors_text',
  'identifier_2rightneighbors_text',
]

const createRascal = prefix => {
  const result = [`${prefix}_kickoff_text`]
  const randomInstructions = getRandomItemFromArray(randomRascalInstructions)
  const randomAnyOne = getRandomItemFromArray(rascalAnyOneKeys)
  const randomAnyTwo = getRandomItemFromArray(rascalAnyTwoKeys)

  switch (randomInstructions) {
    case 'rascal_troublemaker_text':
      result[1] = 'rascal_troublemaker_text'
      result[2] = randomAnyTwo
      break
    case 'rascal_witch_text':
      result[1] = 'rascal_witch_text'
      result[2] = randomAnyOne
      result[3] = 'rascal_witchend_text'
      break
    case 'rascal_drunk_text':
      result[1] = 'rascal_drunk_text'
      result[2] = randomAnyOne
      result[3] = 'rascal_drunkend_text'
      break
    case 'rascal_robber_text':
      result[1] = 'rascal_robber_text'
      result[2] = randomAnyOne
      result[3] = 'rascal_robberend_text'
      break
    default:
      result[1] = 'rascal_idiot_text'
  }

  return result
}

export const rascal = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createRascal(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'rascal') {
      if (card.player_original_id === 52 || (card.player_role_id === 52 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = rascal_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_rascal') {
      if (card.player_role_id === 52 && card.player_original_id === 1) {
        interaction = rascal_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const rascal_interaction = (gameState, token, title) => {
  return {}
}

export const rascal_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []

  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
