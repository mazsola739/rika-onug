import { updatePlayerCard } from '../update-player-card';
import { generateRoleInteractions } from '../generate-role-interactions';
import { getCardIdsByPlayerNumbers, getPlayerNumbersWithMatchingTokens } from '../utils';

//? INFO: Insomniac – Looks at her own card, but does not gain its power, just the team alliance. Can’t if it has a Shield on it
export const insomniac_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach(token => {
    updatePlayerCard(newGameState, token)

    const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
    const currentCard = newGameState.card_positions[currentPlayerNumber[0]]

    if (!newGameState.players[token].shield) {

      newGameState.players[token].card.player_card_id = currentCard.id
      newGameState.players[token].card.player_team = currentCard.team

      const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, currentPlayerNumber)

      role_interactions.push(
        generateRoleInteractions(
          newGameState,
          title,
          token,
          ['interaction_own'],
          'insomniac',
          null,
          null,
          showCards,
          null,
          null
        )
      )

      const playerHistory = {
        ...newGameState.players[token].player_history,
        ...newGameState.actual_scene,
        show_cards: showCards,
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
      newGameState.players[token].player_history = playerHistory
    }
  })

  return { ...newGameState, role_interactions }
};
