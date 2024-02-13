const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")
const { centerCardPositions } = require("../constants")

//? INFO: Seer (2) - Looks at one player's card (not her own) or two cards from the center
exports.seer = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, token)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_center_cards: centerCardPositions,
    selectable_player_cards: selectablePlayersWithNoShield,
  }

  newGameState.players[token].role_history = roleHistory
  newGameState.players[token].card_or_mark_action = false

  const seerPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, seerPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, seerPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[seerPlayerNumber[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[seerPlayerNumber[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[seerPlayerNumber[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[seerPlayerNumber[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  role_interactions.push({
    type: INTERACTION,
    title: "SEER",
    token,
    message: "interaction_seer",
    selectable_center_cards: centerCardPositions,
    selectable_player_cards: selectablePlayersWithNoShield,
    shielded_players: newGameState.shield,
    player_name: newGameState.players[token]?.name,
    player_original_id: newGameState.players[token]?.card?.original_id,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.seer_response = (gameState, token, selected_positions) => {
  const playerCards = selected_positions.some(pos => pos.includes("player"))
  const centerCards = selected_positions.some(pos => pos.includes("center"))

  let showCards = []
  if (playerCards && !centerCards && gameState.players[token].role_history.selectable_player_cards.includes(selected_positions[0])) {
    showCards = [selected_positions[0]]
  } else if (centerCards && !playerCards && [selected_positions[0], selected_positions[1]].every((position) => gameState.players[token].role_history.selectable_center_cards.includes(position))) {
    showCards = [selected_positions[0], selected_positions[1]]
  } else return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  showCards = getCardIdsByPositions(newGameState.card_positions, selected_positions)

  if (showCards.some((showCard) => Object.values(showCard).includes(newGameState.players[token].card.id))) {
    newGameState.players[token].card.id = 0
  }

  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "SEER",
    token,
    message: "interaction_seer2",
    show_cards: showCards,
    shielded_players: newGameState.shield,
    player_name: newGameState.players[token]?.name,
    player_original_id: newGameState.players[token]?.card?.original_id,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })

  newGameState.role_interactions = role_interactions

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed card(s) on the next position(s): ${selected_positions.join(", ")}`

  return newGameState
}

