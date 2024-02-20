import { getPlayerNumbersWithMatchingTokens } from '../utils';
import { centerCardPositions } from '../constants';
import { updatePlayerCard } from '../update-player-card';
import { generateRoleInteractions } from '../generate-role-interactions';
import { isValidSelection } from '../validate-response-data';

//? INFO: Drunk – Swap your card with a card from center but does not look at his new card
export const drunk_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach(token => {
    updatePlayerCard(newGameState, token)

    if (!newGameState.players[token].shield) {
      role_interactions.push(
        generateRoleInteractions(
          newGameState,
          title,
          token,
          ['interaction_must_one_center'],
          'drunk',
          { selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 } },
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
    } else {
      role_interactions.push(
        generateRoleInteractions(
          newGameState,
          title,
          token,
          ['interaction_shielded'],
          'shield',
          null,
          null,
          null,
          null,
          null
        )
      )
      
      const playerHistory = {
        ...newGameState.players[token].player_history,
        ...newGameState.actual_scene,
        shielded: true
      }
      player.player_history = playerHistory
    }
  })

  return { ...newGameState, role_interactions }
};

export const drunk_response = (gameState, token, selected_positions, title) => {
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
  newGameState.players[token].player_history.swapped_cards = [selected_positions[0], `player_${newGameState.players[token].player_number}`]
  newGameState.players[token].card_or_mark_action = true

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_swapped_cards", selected_positions[0], `player_${newGameState.players[token].player_number}`],
      'shield',
      null,
      null,
      null,
      null,
      { swapped_cards: [`player_${newGameState.players[token].player_number}`, selected_positions[0]] }
    )
  ]

  return { ...gameState, role_interactions }
};
