export const witch_narration = () => ["witch_kickoff_text"]; 

import { centerCardPositions } from '../constants';
import { updatePlayerCard } from '../update-player-card';
import { generateRoleInteractions } from '../generate-role-interactions';
import { isValidSelection } from '../validate-response-data';

import {
  getPlayerNumbersWithMatchingTokens,
  getSelectablePlayersWithNoShield,
  getAllPlayerTokens,
  getCardIdsByPositions,
} from '../utils';

//? INFO: Witch - May look at one center card. If she does she must swap it with any player's card (including hers)
export const witch_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach(token => {
    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_may_one_center'],
        'voodoo',
        { selectable_cards: centerCardPositions, selectable_card_limit: { player: 1, center: 0 } },
        null,
        null,
        null,
        null
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 }
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
};

export const witch_response =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }

  if (selected_positions[0].includes("center_")) {
    const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])
    const selectedCenterCardPosition = newGameState.card_positions[selected_positions[0]]

    if (newGameState.players[token].card.original_id === selectedCenterCardPosition.id) {
      newGameState.players[token].card.player_card_id = 0
    }

    const allPlayerTokens = getAllPlayerTokens(newGameState.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    const role_interactions = [
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ["interaction_saw_card", selected_positions[0], "interaction_must_one_any"],
        'voodoo',
        { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
        null,
        showCards,
        null,
        { viewed_cards: [selected_positions[0]] }
      )
    ]

    newGameState.players[token].player_history.selectable_cards = selectablePlayersWithNoShield
    newGameState.players[token].player_history.selectable_card_limit = { player: 1, center: 0 }
    newGameState.players[token].player_history.selected_center_card = selected_positions[0]
    newGameState.players[token].player_history.show_cards = showCards

    return { ...newGameState, role_interactions }
  } else if (selected_positions[0].includes("player_")) {
    const selectedCenterPositionCard = newGameState.card_positions[newGameState.players[token].player_history.selected_center_card]
    const selectedPlayerPositionCard = newGameState.card_positions[selected_positions[0]]

    const selectedCenterCard = { ...selectedCenterPositionCard }
    const selectedPlayerCard = { ...selectedPlayerPositionCard }
    newGameState.card_positions[newGameState.players[token].player_history.selected_center_card] = selectedPlayerCard
    newGameState.card_positions[selected_positions[0]] = selectedCenterCard

    const witchPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])

    if (selected_positions[0] === witchPlayerNumber[0]) {
      const currentCard = newGameState.card_positions[witchPlayerNumber[0]]
      newGameState.players[token].card.player_card_id = currentCard.id
      newGameState.players[token].card.player_team = currentCard.team
    }

    const role_interactions = [
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ["interaction_saw_card", "interaction_swapped_cards", `${newGameState.players[token].player_history.selected_center_card}`, selected_positions[0]],
        'voodoo',
        null,
        null,
        null,
        null,
        { swapped_cards: [newGameState.players[token].player_history.selected_center_card, selected_positions[0]] }
      )
    ]

    newGameState.players[token].player_history.swapped_cards = [newGameState.players[token].player_history.selected_center_card, selected_positions[0]]

    return { ...newGameState, role_interactions }
  }

  return newGameState
};