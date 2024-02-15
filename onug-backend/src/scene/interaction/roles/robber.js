const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: Robber - Swaps his card for any other player’s card (not center) which he then looks at
exports.robber = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = [];

  tokens.forEach((token) => {
    const roleHistory = {
      ...newGameState.actual_scene,
    }
  
    newGameState.players[token].role_history = roleHistory
      
  
  
    role_interactions.push({
      type: INTERACTION,
      title: "",
      token,
      message: "interaction_",
      
      shielded_cards: newGameState.shield,
      player_name: newGameState.players[token]?.name,
      player_original_id: newGameState.players[token]?.card?.original_id,
      player_card_id: newGameState.players[token]?.card?.id,
      player_role: newGameState.players[token]?.card?.role,
      player_role_id: newGameState.players[token]?.card?.role_id,
      player_team: newGameState.players[token]?.card?.team,
      player_number: newGameState.players[token]?.player_number,
    })
  
   // newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} saw Mason position(s): player ${masonPlayerNumbers.join(', ')}`
  })
  
    newGameState.role_interactions = role_interactions

  const selectablePlayerNumber = getPlayerNumbersWithNonMatchingTokens(newGameState.players, token);

  const robberPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, robberPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, robberPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[robberPlayerNumber[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[robberPlayerNumber[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[robberPlayerNumber[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[robberPlayerNumber[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  if (!newGameState.players[token].card.shield) {
    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayerNumbers,
    }

    newGameState.players[token].role_history = roleHistory
    
    role_interactions.push({
      type: INTERACTION,
      title: "ROBBER",
      token,
      message: "interaction_robber",
      selectable_cards: selectablePlayerNumbers,
      selectable_limit: { player: 1, center: 0 },
      shielded_cards: newGameState.shield,
      show_cards: newGameState.flipped,
      player_name: newGameState.players[token]?.name,
      player_original_id: newGameState.players[token]?.card?.original_id,
      player_card_id: newGameState.players[token]?.card?.id,
      player_role: newGameState.players[token]?.card?.role,
      player_role_id: newGameState.players[token]?.card?.role_id,
      player_team: newGameState.players[token]?.card?.team,
      player_number: newGameState.players[token]?.player_number,
    })
  } else if (newGameState.players[token].card.shield) {
    const roleHistory = {
      ...newGameState.actual_scene,
    }

    newGameState.players[token].role_history = roleHistory
    
    role_interactions.push({
      type: INTERACTION,
      title: "ROBBER",
      token,
      message: "interaction_shielded",
      shielded_cards: newGameState.shield,
      show_cards: newGameState.flipped,
      player_name: newGameState.players[token]?.name,
      player_original_id: newGameState.players[token]?.card?.original_id,
      player_card_id: newGameState.players[token]?.card?.id,
      player_role: newGameState.players[token]?.card?.role,
      player_role_id: newGameState.players[token]?.card?.role_id,
      player_team: newGameState.players[token]?.card?.team,
      player_number: newGameState.players[token]?.player_number,
    })

    newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} has shield, can't swap their card`
  }

  newGameState.role_interactions = role_interactions

  return newGameState;
};

exports.robber_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  const robberPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token]);

  const playerCard = { ...newGameState.card_positions[robberPlayerNumbers] };
  const selectedCard = { ...newGameState.card_positions[selected_positions[0]] };

  newGameState.card_positions[robberPlayerNumbers] = selectedCard;
  newGameState.card_positions[selected_positions[0]] = playerCard;

  newGameState.players[token].card.id = newGameState.card_positions[robberPlayerNumbers].id;
  newGameState.players[token].card.team = newGameState.card_positions[robberPlayerNumbers].team;

  const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, robberPlayerNumber);

  newGameState.players[token].role_history.swapped_cards = [selected_positions[0], `player_${newGameState.players[token].player_number}`]
  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "ROBBER",
    token,
    message: "interaction_robber2",
    show_cards: showCards,
    shielded_cards: newGameState.shield,
    player_name: newGameState.players[token]?.name,
    player_original_id: newGameState.players[token]?.card?.original_id,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })

  newGameState.role_interactions = role_interactions

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} swapped their card with ${selected_positions[0]} and then viewed their new card`

  return newGameState
};