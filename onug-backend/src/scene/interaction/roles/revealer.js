const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getCardIdsByPositions, getPlayerNumbersWithMatchingTokens, flippedCardIds, isPlayersCardsFlipped } = require("../utils")
const { townIds } = require("../constants")

//? INFO: Revealer - Turns and keeps one player's card face up unless they are not on the Villager Team
//TODO doppelganger
exports.revealer = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const { players, shield, flipped } = newGameState

  const selectablePlayersWithNoShield = getPlayerNumbersWithNonMatchingTokens(players, token)

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayersWithNoShield,
  }

  newGameState.players[token].role_history = roleHistory
  newGameState.players[token].card_or_mark_action = false

  const revealerPlayerNumbers = getPlayerNumbersWithMatchingTokens(players, [token])
  const revealerInFlippedCards = flippedCardIds(flipped, revealerPlayerNumbers)

  if (isPlayersCardsFlipped(newGameState.flipped, revealerPlayerNumbers)) {
    newGameState.players[token].card.id = newGameState.card_positions[revealerPlayerNumbers[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[revealerPlayerNumbers[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[revealerPlayerNumbers[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[revealerPlayerNumbers[0]].team

    role_interactions.push({
      type: INTERACTION,
      title: "REVEALER",
      token,
      message: "interaction_revealer",
      selectable_cards: selectablePlayersWithNoShield,
      shielded_players: shield,
      flipped_cards: flipped,
      player_name: players[token]?.name,
      player_original_id: players[token]?.card?.original_id,
      player_card_id: players[token]?.card?.id,
      player_role: players[token]?.card?.role,
      player_role_id: players[token]?.card?.role_id,
      player_team: players[token]?.card?.team,
      player_number: players[token]?.player_number,
    })
  } else if (revealerInFlippedCards) {
    newGameState.players[token].card.id = 0

    role_interactions.push({
      type: INTERACTION,
      title: "REVEALER",
      token,
      message: "interaction_revealer",
      selectable_cards: selectablePlayersWithNoShield,
      shielded_players: shield,
      flipped_cards: flipped,
      player_name: players[token]?.name,
      player_original_id: players[token]?.card?.original_id,
      player_card_id: players[token]?.card?.id,
      player_role: players[token]?.card?.role,
      player_role_id: players[token]?.card?.role_id,
      player_team: players[token]?.card?.team,
      player_number: players[token]?.player_number,
    })
  } else {
    role_interactions.push({
      type: INTERACTION,
      title: "REVEALER",
      token,
      message: "interaction_revealer",
      selectable_cards: selectablePlayersWithNoShield,
      shielded_players: shield,
      flipped_cards: flipped,
      player_name: players[token]?.name,
      player_original_id: players[token]?.card?.original_id,
      player_card_id: players[token]?.card?.id,
      player_role: players[token]?.card?.role,
      player_role_id: players[token]?.card?.role_id,
      player_team: players[token]?.card?.team,
      player_number: players[token]?.player_number,
    })
  }

  return newGameState
}

exports.revealer_response = (gameState, token, selected_positions) => {
  if (!gameState.players[token].role_history.selectable_cards.includes(selected_positions[0])) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const { players, shield, flipped } = newGameState

  const flippedCard = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])[0]
  const isTown = townIds.includes(flippedCard)

  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "REVEALER",
    token,
    message: "interaction_revealer2",
    shielded_players: shield,
    flipped_cards: flipped,
    player_name: players[token]?.name,
    player_original_id: players[token]?.card?.original_id,
    player_card_id: players[token]?.card?.id,
    player_role: players[token]?.card?.role,
    player_role_id: players[token]?.card?.role_id,
    player_team: players[token]?.card?.team,
    player_number: players[token]?.player_number,
  })

  newGameState.actual_scene.interaction = `The player, ${newGameState.players[token].player_number}, flipped a card in the next position: ${selected_positions[0]}, and it turned out to be ${isTown ? "a town member" : "a non-town member"}.`

  if (isTown) {
    newGameState.flipped.push(flippedCard)
    newGameState.players[token].role_history.flipped_cards = [flippedCard]
  } else {
    newGameState.players[token].role_history.show_cards = [flippedCard]
  }

  newGameState.role_interactions = role_interactions

  return newGameState
}