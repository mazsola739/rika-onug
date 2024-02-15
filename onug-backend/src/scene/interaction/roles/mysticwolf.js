const { INTERACTION } = require("../../../constant/ws")
const { getCardIdsByPositions, getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: Mystic Wolf - Wakes with other Werewolves. Wakes after and looks at any other player's card (not center or own)
exports.mysticwolf = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    const player = players[token]
    const flippedCards = newGameState.flipped

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield,
    }

    player.role_history = roleHistory

    const mysticwolfPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, mysticwolfPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, mysticwolfPlayerNumber)
    const playerCard = player?.card
    const currentCard = newGameState.card_positions[mysticwolfPlayerNumber[0]]

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
      title: "MYSTIC_WOLF",
      token,
      message: "interaction_mysticwolf",
      selectable_cards: selectablePlayersWithNoShield,
      selectable_limit: { player: 1, center: 0 },
      shielded_cards: newGameState.shield,
      player_name: player?.name,
      player_original_id: player?.card?.original_id,
      player_card_id: player?.card?.id,
      player_role: player?.card?.role,
      player_role_id: player?.card?.role_id,
      player_team: player?.card?.team,
      player_number: player?.player_number,
    })
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.mysticwolf_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card
  const cardPositions =  newGameState?.card_positions
  const showCards = getCardIdsByPositions(cardPositions, [selected_positions[0]])
  const selectedPositionCard = cardPositions[selected_positions[0]]

  if (playerCard.original_id === selectedPositionCard.id) {
    playerCard.id = 0
  }

  player.role_history.show_cards = showCards
  player.role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "MYSTIC_WOLF",
    token,
    message: "interaction_mysticwolf2",
    show_cards: showCards,
    shielded_cards: newGameState.shield,
    player_name: player?.name,
    player_original_id: player?.card?.original_id,
    player_card_id: player?.card?.id,
    player_role: player?.card?.role,
    player_role_id: player?.card?.role_id,
    player_team: player?.card?.team,
    player_number: player?.player_number,
  })

  newGameState.role_interactions = role_interactions
  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed the card at position: ${selected_positions[0]}`

  return newGameState
}
