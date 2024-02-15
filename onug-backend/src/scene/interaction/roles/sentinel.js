const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: Sentinel - Place a Shield token on any other player's card that card (not mark) cannot be looked at or moved
//! MARK_OF_FEAR
exports.sentinel = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const selectablePlayerNumber = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumber, newGameState.shield)
    const player = players[token]

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield,
    }
    player.role_history = roleHistory

    const sentinelPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, sentinelPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, sentinelPlayerNumber)
    const playerCard = player?.card
    const currentCard = newGameState.card_positions[sentinelPlayerNumber[0]]
  
    if (iSeeMyCardIsFlipped) {
      playerCard.id = currentCard?.id
      playerCard.role_id = currentCard?.id
      playerCard.role = currentCard?.role
      playerCard.team = currentCard?.team
    } else if (iSeeMyCardElsewhere) {
      playerCard.id = 0
    }
  
    role_interactions.push({
      type: INTERACTION,
      title: "SENTINEL",
      token,
      message: "interaction_sentinel",
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 1, center: 0 },
      shielded_cards: newGameState.shield,
      show_cards: newGameState.flipped,
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

exports.sentinel_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card

  newGameState.shield.push(selected_positions[0])
  const shieldedCards = newGameState.shield
  const shieldedPlayerTokens = shieldedCards.map(player => getPlayerTokenByPlayerNumber(newGameState.players, player))
  shieldedPlayerTokens.forEach((token) => {
    players[token].shield = true
  })

  player.role_history.new_shielded_card = selected_positions[0]

  role_interactions.push({
    type: INTERACTION,
    title: "SENTINEL",
    token,
    message: "interaction_sentinel2",
    shielded_cards: newGameState.shield,
    show_cards: newGameState.flipped,
    player_name: player?.name,
    player_original_id: playerCard?.original_id,
    player_card_id: playerCard?.id,
    player_role: playerCard?.role,
    player_role_id: playerCard?.role_id,
    player_team: playerCard?.team,
    player_number: player?.player_number,
  })

  newGameState.role_interactions = role_interactions
  newGameState.actual_scene.interaction = `The player ${player.player_number} placed a shield on the next position: ${selected_positions[0]}`

  return newGameState
}
