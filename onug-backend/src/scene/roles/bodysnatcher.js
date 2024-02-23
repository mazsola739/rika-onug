//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../utils/scene'

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

const createBodysnatcher = (prefix) => () =>
  [
    `${prefix}_kickoff_text`,
    getRandomItemFromArray(randomBodysnatcher),
    getRandomItemFromArray(bodysnatcherKeys),
    'bodysnatcher_end_text',
  ]

export const bodysnatcher = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const narration = createBodysnatcher(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 74) {
      interaction = bodysnatcher_interaction(newGameState, token, title)
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

export const bodysnatcher_interaction = (gameState, token, title) => {
  return {}
}
export const bodysnatcher_response = (gameState, token, selected_positions, title) => {
  return {}
}
