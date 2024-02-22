import { werewolvesAndDreamWolfIds } from "../constants"
import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const minion = (gameState) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger ? "doppelganger_minion_kickoff_text" : "minion_kickoff_text",
    "minion_kickoff2_text",
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 7) {
    newGameState.players[token].scene_role_interaction.interaction = minion_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const minion_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const werewolfPlayerNumbers = werewolvesAndDreamWolfIds //TODO

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    werewolves: werewolfPlayerNumbers
  }

  return generateRoleInteraction(
    newGameState,
    private_message = ['interaction_werewolves'],
    icon = 'werewolf',
    uniqInformations = { werewolves: werewolfPlayerNumbers },
  )
}
