const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped, getCardIdsByPositions, concatArraysWithUniqueElements , getKeys } = require("../utils")
const { centerCardPositions } = require("../constants")

//? INFO: Seer (2) - Looks at one player's card (not her own) or two cards from the center
exports.seer = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)
    const selectablePositions= concatArraysWithUniqueElements(centerCardPositions, selectablePlayersWithNoShield)  

    const player = players[token]
    const flippedCards = newGameState.flipped

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePositions,
    }

    player.role_history = roleHistory

    const seerPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, seerPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, seerPlayerNumber)
    const playerCard = player?.card
    const currentCard = newGameState.card_positions[seerPlayerNumber[0]]

    if (iSeeMyCardIsFlipped) {
      playerCard.id = currentCard.id
      playerCard.role_id = currentCard.id
      playerCard.role = currentCard.role
      playerCard.team = currentCard.team
    } else if (iSeeMyCardElsewhere) {
      playerCard.id = 0
    }

    role_interactions.push({
      type: INTERACTION,
      title: "SEER",
      token,
      message: "interaction_seer",
      selectable_cards: selectablePositions,
      selectable_card_limit: { player: 1, center: 2 },
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: flippedCards,
      player_name: player?.name,
      player_original_id: playerCard?.original_id,
      player_card_id: playerCard?.id,
      player_role: playerCard?.role,
      player_role_id: playerCard?.role_id,
      player_team: playerCard?.team,
      player_number: player?.player_number,
    })
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.seer_response = (gameState, token, selected_positions) => {
  const newGameState = { ...gameState };
  const role_interactions = [];
  const players = newGameState.players;
  
  let showCards = [];
  
  const playerCards = selected_positions.some(pos => pos.includes("player"));
  const centerCards = selected_positions.some(pos => pos.includes("center"));
  
  const roleHistory = players[token].role_history.selectable_cards;
  const playerCard = players[token]?.card;

  if (playerCards && !centerCards && roleHistory.includes(selected_positions[0])) {
    showCards = getCardIdsByPositions(gameState?.card_positions, [selected_positions[0]]);
  } else if (centerCards && !playerCards && selected_positions.every(position => roleHistory.includes(position))) {
    showCards = getCardIdsByPositions(gameState?.card_positions, selected_positions);
  } else {
    return newGameState;
  }

  if (showCards.some(card => playerCard.original_id === card.id)) {
    playerCard.id = 0;
  }

  players[token].role_history.show_cards = showCards;
  players[token].role_history.card_or_mark_action = true;

  role_interactions.push({
    type: INTERACTION,
    title: "SEER",
    token,
    message: "interaction_seer2",
    show_cards: concatArraysWithUniqueElements(showCards, newGameState.flipped),
    shielded_cards: newGameState.shield,
    artifacted_cards: getKeys(newGameState.artifact),
    player_name: playerCard?.name,
    player_original_id: playerCard?.original_id,
    player_card_id: playerCard?.id,
    player_role: playerCard?.role,
    player_role_id: playerCard?.role_id,
    player_team: playerCard?.team,
    player_number: players[token]?.player_number,
  });

  newGameState.role_interactions = role_interactions;
  newGameState.actual_scene.interaction = `The player ${players[token].player_number} viewed card(s) on the next position(s): ${selected_positions.join(", ")}`;

  return newGameState;
}
