//@ts-check
import { getAllPlayerTokens, getRandomItemFromArray } from "../../utils/scene"

const randomBodysnatcher = [
  "bodysnatcher_steal_text",
  "bodysnatcher_center_text",
]
const bodysnatcherKeys = [
  "identifier_any_text",
  "identifier_anyeven_text",
  "identifier_anyodd_text",
  "identifier_leftneighbor_text",
  "identifier_rightneighbor_text",
  "identifier_bothneighbors_text",
]

const createBodysnatcher = (prefix) => () =>
  [
    `${prefix}_kickoff_text`,
    getRandomItemFromArray(randomBodysnatcher),
    getRandomItemFromArray(bodysnatcherKeys),
    "bodysnatcher_end_text",
  ]

export const bodysnatcher = (gameState, prefix) => {
  const newGameState = { ...gameState }
  const narration = createBodysnatcher(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 74) {
    newGameState.players[token].scene_role_interaction.interaction = bodysnatcher_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const bodysnatcher_interaction = (gameState, token) => {return {}}
export const bodysnatcher_response =  (gameState, token, selected_positions) => {return {}}
