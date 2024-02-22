//@ts-check
import { getAllPlayerTokens, getRandomItemFromArray } from "../../utils/scene"

const random_psychic = ["psychic_view1_text", "psychic_view2_text"]
const psychicKeys = ["identifier_anyeven_text", "identifier_anyodd_text"]
const createPsychic = (prefix) => () =>
  [
    `${prefix}_kickoff_text`,
    getRandomItemFromArray(random_psychic),
    getRandomItemFromArray(psychicKeys),
  ]

export const psychic = (gameState, prefix) => {
  const newGameState = { ...gameState }
  const narration = createPsychic(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 51) {
    newGameState.players[token].scene_role_interaction.interaction = psychic_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const psychic_interaction = (gameState, token) => {return {}}
export const psychic_response =  (gameState, token, selected_positions) => {return {}}
