const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")


//? INFO: Troublemaker - Swaps any two other player's cards (not her own or center) without looking at them
exports.troublemaker = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = [];

  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, token);

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayerNumbers,
  }

  newGameState.players[token].role_history = roleHistory
  newGameState.players[token].card_or_mark_action = false

  const troublemakerPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, troublemakerPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, troublemakerPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[troublemakerPlayerNumber[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[troublemakerPlayerNumber[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[troublemakerPlayerNumber[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[troublemakerPlayerNumber[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  role_interactions.push({
    type: INTERACTION,
    title: "TROUBLEMAKER",
    token,
    message: "interaction_troublemaker",
    selectable_cards: selectablePlayerNumbers,
    shielded_players: newGameState.shield,
    show_cards: newGameState.flipped,
    player_name: newGameState.players[token]?.name,
    player_original_id: newGameState.players[token]?.card?.original_id,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })


  newGameState.role_interactions = role_interactions

  return newGameState;
};

exports.troublemaker_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  const playerOneCard = { ...newGameState.card_positions[selected_positions[0]] };
  const playerTwoCard = { ...newGameState.card_positions[selected_positions[1]] };

  newGameState.card_positions[selected_positions[0]] = playerTwoCard;
  newGameState.card_positions[selected_positions[1]] = playerOneCard;

  newGameState.players[token].role_history.swapped_cards = selected_positions.slice(0, 2)
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "TROUBLEMAKER",
    token,
    message: "interaction_troublemaker2",
    swapped_cards: selected_positions.slice(0, 2),
    shielded_players: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} swapped cards between: ${selected_positions[0]} and ${selected_positions[1]}`

  return newGameState
};