//@ts-check
import { superVillainsIds } from '../../constant'
import { getAllPlayerTokens } from "../../utils/scene"

export const supervillains = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["supervillains_kickoff_text"] 
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (superVillainsIds.some(id => newGameState.players[token].card.player_role_id === id)) {
    newGameState.players[token].scene_role_interaction.interaction = supervillain_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const supervillain_interaction = (gameState, token) => {return {}}
export const supervillain_response =  (gameState, token, selected_positions) => {return {}}
