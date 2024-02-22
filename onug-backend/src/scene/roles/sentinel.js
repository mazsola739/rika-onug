//@ts-check
import { getAllPlayerTokens, getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield } from "../../utils/scene"
import { generateRoleInteraction } from "../generate-scene-role-interactions"
import { isValidSelection } from '../validate-response-data'

export const sentinel = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["sentinel_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 25) {
    newGameState.players[token].scene_role_interaction.interaction = sentinel_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const sentinel_interaction = (gameState, token) => {
  const newGameState = { ...gameState }

  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, [token])
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 }
  }

  return generateRoleInteraction(
    newGameState,
    {private_message: ['interaction_may_one_any_other'],
    icon: 'shield',
    selectableCards: { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },}
  )
}

export const sentinel_response =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }

  const shieldedPlayerToken = getPlayerTokenByPlayerNumber(newGameState.players, selected_positions[0])

  newGameState.shield.push(selected_positions[0])
  newGameState.players[shieldedPlayerToken[0]].shield = true //TODO

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    new_shield_card: [selected_positions[0]] 
  }

  return generateRoleInteraction(
    newGameState,
    {private_message: ["interaction_placed_shield", selected_positions[0]],
    icon: 'shield',
    uniqInformations:  { new_shield_card: [selected_positions[0]] }}
  )
}
