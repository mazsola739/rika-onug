const { INTERACTION } = require("../../../constant/ws")
const { centerCardPositions } = require("../constants")
const { getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped , getKeys, getSelectablePlayersWithNoShield, getAllPlayerTokens, getCardIdsByPositions, concatArraysWithUniqueElements } = require("../utils")

//? INFO: Witch - May look at one center card. If she does she must swap it with any player's card (including hers)
exports.witch = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]
    const flippedCards = newGameState.flipped

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: centerCardPositions,
    }
    player.role_history = roleHistory

    const witchPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, witchPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, witchPlayerNumber)
    const playerCard = player?.card
    const currentCard = newGameState.card_positions[witchPlayerNumber[0]]

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
      title: "WITCH",
      token,
      message: "interaction_witch",
      selectable_cards: centerCardPositions,
      selectable_card_limit: { player: 0, center: 1 },
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

exports.witch_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card
  const cardPositions =  newGameState.card_positions

  if (selected_positions[0].includes("center_")) {
  const showCards = getCardIdsByPositions(cardPositions, [selected_positions[0]])
  const selectedCenterCardPosition = cardPositions[selected_positions[0]]

  if (playerCard.original_id === selectedCenterCardPosition.id) {
    playerCard.id = 0
  }

  const allPlayerTokens = getAllPlayerTokens(players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayersWithNoShield,
    selected_center_card: selectedCenterCardPosition,
    show_cards: showCards,
    card_or_mark_action: true,
  }

  player.role_history = roleHistory

  role_interactions.push({
    type: INTERACTION,
    title: "WITCH",
    token,
    message: "interaction_witch2",
    show_cards: concatArraysWithUniqueElements(showCards, newGameState.flipped),
    viewed_cards: [selected_positions[0]],
    selectable_cards: selectablePlayersWithNoShield,
    selectable_card_limit: { player: 1, center: 0 },
    shielded_cards: newGameState.shield,
    artifacted_cards: getKeys(newGameState.artifact),
    player_name: player?.name,
    player_original_id: playerCard?.original_id,
    player_card_id: playerCard?.id,
    player_role: playerCard?.role,
    player_role_id: playerCard?.role_id,
    player_team: playerCard?.team,
    player_number: player?.player_number,
  })

  newGameState.role_interactions = role_interactions
  newGameState.actual_scene.interaction = `The player ${player.player_number} viewed a card in the next position: ${selected_positions[0]}`
  } else if (selected_positions[0].includes("player_")) {
    const selectedCenterPositionCard = cardPositions[player.role_history.selected_center_card]
    const selectedPlayerPositionCard = cardPositions[selected_positions[0]]

    const selectedCenterCard = { ...selectedCenterPositionCard }
    const selectedPlayerCard = { ...selectedPlayerPositionCard }

    cardPositions[player.role_history.selected_center_card] = selectedPlayerCard
    cardPositions[selected_positions[0]] = selectedCenterCard

    player.role_history.swapped_cards = [player.role_history.selected_center_card, selected_positions[0]]

    role_interactions.push({
      type: INTERACTION,
      title: "WITCH",
      token,
      message: "interaction_witch3",
      show_cards: newGameState.flipped,
      swapped_cards: [player.role_history.selected_center_card, selected_positions[0]],
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      player_name: player?.name,
      player_original_id: playerCard?.original_id,
      player_card_id: playerCard?.id,
      player_role: playerCard?.role,
      player_role_id: playerCard?.role_id,
      player_team: playerCard?.team,
      player_number: player?.player_number,
    })

    newGameState.role_interactions = role_interactions
    newGameState.actual_scene.interaction = `The player ${player.player_number} swapped cards between positions: ${[player.role_history.selected_center_card, selected_positions[0]].join(', ')}`
  }

  
  return newGameState
}