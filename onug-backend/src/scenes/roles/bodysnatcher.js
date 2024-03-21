//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens } from '../../utils'

const randomBodysnatcher = [
  'bodysnatcher_steal_text',
  'bodysnatcher_center_text',
]
const bodysnatcherKeys = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_bothneighbors_text',
]

const createBodysnatcher = prefix =>  [`${prefix}_kickoff_text`, getRandomItemFromArray(randomBodysnatcher), getRandomItemFromArray(bodysnatcherKeys), 'bodysnatcher_end_text']

export const bodysnatcher = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createBodysnatcher(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'bodysnatcher') {
      if (card.player_original_id === 74 || (card.player_role_id === 74 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = bodysnatcher_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_bodysnatcher') {
      if (card.player_role_id === 74 && card.player_original_id === 1) {
        interaction = bodysnatcher_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const bodysnatcher_interaction = (gameState, token, title) => {
  return {}
}

export const bodysnatcher_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  
  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
