//@ts-check

import { getAllPlayerTokens } from "../../utils/scene"


export const villageidiot = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ['villageidiot_kickoff_text']

  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    newGameState.players[token].scene_role_interaction.narration = narration

    if (newGameState.players[token].card.player_original_id === 26) {
      newGameState.players[token].scene_role_interaction.interaction = villageidiot_interaction(newGameState, token)
    }
  })

  return newGameState
}

export const villageidiot_interaction = (gameState, token) => {return {}}
export const villageidiot_response =  (gameState, token, selected_positions) => {return {}}