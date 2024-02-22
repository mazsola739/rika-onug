import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const doppelganger = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["doppelganger_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 1) {
    newGameState.players[token].scene_role_interaction.interaction = doppelganger_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const doppelganger_interaction = (gameState, token) => {
  const newGameState = { ...gameState }
  
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, [token])

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
    }

    return generateRoleInteraction(
      newGameState,
      private_message = ['interaction_must_one_any_other'],
      icon = 'copy',
      selectable_cards = { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
    )
}

export const doppelganger_response =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }

  newGameState.players[token].card.player_role_id = newGameState.card_positions[selected_positions[0]].id
  newGameState.players[token].card.player_role = newGameState.card_positions[selected_positions[0]].role
  newGameState.players[token].card.player_team = newGameState.card_positions[selected_positions[0]].team
  
  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])

  newGameState.players[token].player_history.show_cards = showCards,
  newGameState.players[token].new_role_id = newGameState.players[token].card.player_role_id
  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    card_or_mark_action: true,
    viewed_cards: showCards
  }

  return generateRoleInteraction(
    newGameState,
    private_message =  ["interaction_you_are_that_role", `${newGameState.players[token]?.card.player_role}`],
    icon = 'copy',
    showCards = showCards,
    uniqInformations =  { new_role_id: newGameState.players[token].card.player_role_id, }
  )
}
