import { updatePlayerCard } from '../update-player-card';
import { generateRoleInteractions } from '../generate-role-interactions';
import { isValidSelection } from '../validate-response-data';
import { getPlayerNumbersWithNonMatchingTokens, getCardIdsByPositions } from '../utils';

//? INFO: Doppelgänger - Looks at any other player's card and becomes that card. Does that action during but different time
//! At this moment doppelganger never see flipped or shielded cards, ripple different
export const doppelganger_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, [token])

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_must_one_any_other'],
        'copy',
        { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
        null,
        null,
        null,
        null,
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 }
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
};

export const doppelganger_response_interaction =  (gameState, token, selected_positions, title) => {
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

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_you_are_that_role", `${newGameState.players[token]?.card.player_role}`],
      'copy',
      null,
      null,
      showCards,
      null,
      { new_role_id: newGameState.players[token].card.player_role_id, }
    )
  ]

  return { ...newGameState, role_interactions }
};
