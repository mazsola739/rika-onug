//@ts-check
import { getAllPlayerTokens, getRandomItemFromArray } from "../../utils/scene"

const random_psychic = ["psychic_view1_text", "psychic_view2_text"]
const psychicKeys = ["identifier_anyeven_text", "identifier_anyodd_text"]
const createPsychic = (kickoffText) => () =>
  [
    kickoffText,
    getRandomItemFromArray(random_psychic),
    getRandomItemFromArray(psychicKeys),
  ]

export const psychic = (gameState, prefix) => { //TODO fix prefix
  const newGameState = { ...gameState }
  const narration = []
  createPsychic("psychic_kickoff_text")
  createPsychic("doppelganger_psychic_kickoff_text")
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
