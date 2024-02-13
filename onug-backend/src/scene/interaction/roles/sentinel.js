const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: Sentinel - Place a Shield token on any other player's card that card (not mark) cannot be looked at or moved
//! MARK_OF_FEAR
exports.sentinel = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, token)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayersWithNoShield,
  }

  newGameState.players[token].role_history = roleHistory
  newGameState.players[token].card_or_mark_action = false

  const sentinelPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, sentinelPlayerNumbers)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, sentinelPlayerNumbers)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[sentinelPlayerNumbers[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[sentinelPlayerNumbers[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[sentinelPlayerNumbers[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[sentinelPlayerNumbers[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  role_interactions.push({
    type: INTERACTION,
    title: "SENTINEL",
    token,
    message: "interaction_sentinel",
    selectable_cards: selectablePlayersWithNoShield,
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

  return newGameState
}

exports.sentinel_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  newGameState.shield.push(selected_positions[0])

  const shieldedPlayers = newGameState.shield
  const shieldedPlayerTokens = shieldedPlayers.map(player => getPlayerTokenByPlayerNumber(newGameState.players, player))

  shieldedPlayerTokens.forEach((token) => {
    newGameState.players[token].card.shield = true
  })

  newGameState.players[token].role_history.shielded_card = selected_positions[0]

  role_interactions.push({
    type: INTERACTION,
    title: "SENTINEL",
    token,
    message: "interaction_sentinel2",
    shielded_card: selected_positions[0],
    shielded_players: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} placed a shield on the next position: ${selected_positions[0]}`

  return newGameState
}
