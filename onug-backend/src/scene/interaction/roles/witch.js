const { INTERACTION } = require("../../../constant/ws")
const { centerCardPositions } = require("../constants")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithMatchingTokens, getKeys, getSelectablePlayersWithNoShield, getAllPlayerTokens, getCardIdsByPositions, concatArraysWithUniqueElements } = require("../utils")

//? INFO: Witch - May look at one center card. If she does she must swap it with any player's card (including hers)
exports.witch = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]

    const playerHistory = {
      ...newGameState.actual_scene,
      selectable_cards: centerCardPositions,
    }
    player.player_history = playerHistory

    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped
  
    

role_interactions.push({
      type: INTERACTION,
      title,
      token,
      informations: {
        message: ["interaction_may_one_center"],
        icon: 'voodoo',
        selectable_cards: centerCardPositions,
        selectable_card_limit: { player: 0, center: 1 },
        shielded_cards: newGameState.shield,
        artifacted_cards: getKeys(newGameState.artifact),
        show_cards: flippedCards,
      },
      player: {
        player_name: player?.name,
        player_number: player?.player_number,
        ...playerCard,
      },
    })
   })
  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.witch_response = (gameState, token, selected_positions, title) => {

  if (selected_positions.every((position) => gameState.players[token].player_history.selectable_cards.includes(position)) === false) return gameState
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
    playerCard.player_card_id = 0
  }

  const allPlayerTokens = getAllPlayerTokens(players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  const playerHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayersWithNoShield,
    selected_center_card: selected_positions[0],
    show_cards: showCards,
    card_or_mark_action: true,
  }

  player.player_history = playerHistory

  

role_interactions.push({
    type: INTERACTION,
    title,
    token,
    informations: {
      message: ["interaction_saw_card", `${selected_positions[0]}`, "interaction_must_one_any"],
      icon: 'voodoo',
      viewed_cards: [selected_positions[0]],
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: concatArraysWithUniqueElements(showCards, newGameState.flipped),
    },
    player: {
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    },
  })
  newGameState.role_interactions = role_interactions
} else if (selected_positions[0].includes("player_")) {
    const selectedCenterPositionCard = cardPositions[player.player_history.selected_center_card]
    const selectedPlayerPositionCard = cardPositions[selected_positions[0]]

    const selectedCenterCard = { ...selectedCenterPositionCard }
    const selectedPlayerCard = { ...selectedPlayerPositionCard }

    cardPositions[player.player_history.selected_center_card] = selectedPlayerCard
    cardPositions[selected_positions[0]] = selectedCenterCard

    const witchPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])
    const playerCard = player?.card

    if (selected_positions[0] === witchPlayerNumber[0]) {
      const currentCard = newGameState.card_positions[witchPlayerNumber[0]]

      playerCard.player_card_id = currentCard.id
      playerCard.player_team = currentCard.team
    }

    player.player_history.swapped_cards = [player.player_history.selected_center_card, selected_positions[0]]

    

role_interactions.push({
      type: INTERACTION,
      title,
      token,
      informations: {
        message: ["interaction_saw_card", "interaction_swapped_cards", `${player.player_history.selected_center_card}`, `${selected_positions[0]}`],
        icon: 'voodoo',
        swapped_cards: [player.player_history.selected_center_card, selected_positions[0]],
        shielded_cards: newGameState.shield,
        artifacted_cards: getKeys(newGameState.artifact),
        show_cards: newGameState.flipped,
      },
      player: {
        player_name: player?.name,
        player_number: player?.player_number,
        ...playerCard,
      },
    })
    newGameState.role_interactions = role_interactions
  }

  return newGameState
}