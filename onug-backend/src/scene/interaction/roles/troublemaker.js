const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { isValidSelection } = require("../validate-response-data")
const { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield } = require("../utils")

//? INFO: Troublemaker - Swaps any two other player's cards (not her own or center) without looking at them
exports.troublemaker = (gameState, tokens, title) => {
  const newGameState = { ...gameState };
  const role_interactions = [];

  tokens.forEach(token => {
    const { players, shield, actual_scene } = newGameState;
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token]);
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, shield);

    updatePlayerCard(newGameState, token);

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_may_two_any_other'],
        'swap',
        { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 2, center: 0 } },
        null,
        null,
        null,
        null
      )
    );

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 2, center: 0 }
    };
    newGameState.players[token].player_history = playerHistory;
  });

  return { ...newGameState, role_interactions };
};


exports.troublemaker_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState;
  }

  const newGameState = { ...gameState };
  const { players, card_positions: cardPositions } = newGameState;
  const player = players[token];

  const [position1, position2] = selected_positions;
  const playerOneCard = { ...cardPositions[position1] };
  const playerTwoCard = { ...cardPositions[position2] };

  cardPositions[position1] = playerTwoCard;
  cardPositions[position2] = playerOneCard;

  player.player_history.swapped_cards = [position1, position2];
  player.card_or_mark_action = true;

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_swapped_cards", position1, position2],
      'claw',
      null,
      null,
      null,
      null,
      { swapped_cards: [position1, position2] }
    )
  ];

  return { ...newGameState, role_interactions };
};