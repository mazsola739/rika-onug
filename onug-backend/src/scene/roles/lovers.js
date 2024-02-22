//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

export const lovers = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["lovers_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].mark.id === "mark_of_love") {
    newGameState.players[token].scene_role_interaction.interaction = lover_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const lover_interaction = (gameState, token) => {return {}}
