import {
  getPlayerNumbersWithNonMatchingTokens,
  getSelectablePlayersWithNoShield,
  getCardIdsByPositions,
  concatArraysWithUniqueElements,
  getKeys,
} from '../utils';

import { centerCardPositions } from '../constants';
import { updatePlayerCard } from '../update-player-card';
import { generateRoleInteractions } from '../generate-role-interactions';
import { isValidSelection } from '../validate-response-data';

//? INFO: Seer (2) - Looks at one player's card (not her own) or two cards from the center
export const seer_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)
    const selectablePositions = concatArraysWithUniqueElements(centerCardPositions, selectablePlayersWithNoShield)

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_may_one_any_other', "conjunction_or", "interaction_seer_end"],
        'seer',
        { selectable_cards: selectablePositions, selectable_card_limit: { player: 1, center: 2 } },
        null,
        null,
        null,
        null
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: selectablePositions, selectable_card_limit: { player: 1, center: 2 }
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
};

export const seer_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }

  let showCards = []

  const playerCards = selected_positions.some((pos) => pos.includes('player'))
  const centerCards = selected_positions.some((pos) => pos.includes('center'))
  const playerHistory = newGameState.players[token].player_history.selectable_cards

  if (playerCards && !centerCards && playerHistory.includes(selected_positions[0])) {
    showCards = getCardIdsByPositions(newGameState?.card_positions, [selected_positions[0]])
  } else if (centerCards && !playerCards && selected_positions.every((position) => playerHistory.includes(position))) {
    showCards = getCardIdsByPositions(newGameState?.card_positions, selected_positions)
  } else {
    return newGameState
  }

  if (showCards.some((card) => newGameState.players[token].card.player_original_id === card.id)) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].player_history.show_cards = showCards
  newGameState.players[token].card_or_mark_action = true

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ['interaction_saw_card', selected_positions[0], showCards.length > 1 ? selected_positions[1]: ""],
      'seer',
      null,
      showCards,
      null,
      null,
      { viewed_cards: showCards }
    )
  ]

  return { ...newGameState, role_interactions }
};
