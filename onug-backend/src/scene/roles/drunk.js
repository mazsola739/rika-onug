//@ts-check
import { centerCardPositions } from "../../constant"
import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from "../../utils/scene"
import { generateRoleInteraction } from "../generate-scene-role-interactions"
import { isValidSelection } from '../validate-response-data'

export const drunk = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["drunk_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 2) {
    newGameState.players[token].scene_role_interaction.interaction = drunk_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const drunk_interaction = (gameState, token) => {
  const newGameState = { ...gameState }

    if (!newGameState.players[token].shield) {
      newGameState.players[token].player_history = {
        ...newGameState.players[token].player_history,
        selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 },
      }
  
      return generateRoleInteraction(
        newGameState,
       { private_message: ['interaction_must_one_center'],
        icon: 'drunk',
        selectableCards: {selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 }},}
      )
    } else {
      newGameState.players[token].player_history = {
        ...newGameState.players[token].player_history,
        shielded: true,
      }
  
      return generateRoleInteraction(
        newGameState,
       { private_message: ['interaction_shielded'],
        icon: 'shield',
        uniqInformations: { shielded: true },}
      )
    }
}

export const drunk_response =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }

  const drunkPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])[0]
  const drunkCard = { ...newGameState.card_positions[drunkPlayerNumber] }
  const selectedCard = { ...newGameState.card_positions[selected_positions[0]] }
  newGameState.card_positions[drunkPlayerNumber] = selectedCard
  newGameState.card_positions[selected_positions[0]] = drunkCard

  newGameState.players[token].card.player_card_id = 0
  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    card_or_mark_action: true,
    swapped_cards: [`player_${newGameState.players[token].player_number}`, selected_positions[0]]
  }

  return generateRoleInteraction(
    newGameState,
   { private_message: ["interaction_swapped_cards", selected_positions[0], `player_${newGameState.players[token].player_number}`],
    icon: 'drunk',
    uniqInformations: { swapped_cards: [`player_${newGameState.players[token].player_number}`, selected_positions[0]] }}
  )
}
