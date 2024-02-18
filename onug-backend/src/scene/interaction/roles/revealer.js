const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getCardIdsByPositions, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, concatArraysWithUniqueElements, getKeys, isActivePlayersCardsFlipped } = require("../utils")
const { townIds } = require("../constants")
const { updatePlayerCard } = require("../update-player-card")

//? INFO: Revealer - Turns and keeps one player's card face up unless they are not on the Villager Team
//TODO doppelganger
exports.revealer = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]

    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    const playerHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield,
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
        message: ["interaction_may_one_any_other"],
        icon: 'id',
        selectable_cards: selectablePlayersWithNoShield,
        selectable_card_limit: { player: 1, center: 0 },
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
//TODO better response message
exports.revealer_response = (gameState, token, selected_positions, title) => {
  if (selected_positions.every((position) => gameState.players[token].player_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card
  const cardPositions =  newGameState.card_positions

  const revealedCard = getCardIdsByPositions(cardPositions, [selected_positions[0]])
  const isTown = revealedCard.every(card => townIds.includes(Object.values(card)[0]))

  player.card_or_mark_action = true

  const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const revealerCardInFlippedCards = isActivePlayersCardsFlipped(revealedCard, currentPlayerNumber)

  if (revealerCardInFlippedCards) {
    playerCard.player_card_id = 0
  }
//todo not complete the message
  

role_interactions.push({
    type: INTERACTION,
    title,
    token,
    informations: {
      message: ["interaction_saw_card", `${selected_positions[0]}`],
      icon: 'id',
      flipped_cards: `${selected_positions[0]}`,
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: concatArraysWithUniqueElements(revealedCard, newGameState.flipped),
    },
    player: {
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    },
  })

  if (isTown) {
    newGameState.flipped.push(revealedCard[0])
    newGameState.players[token].player_history.flipped_cards = revealedCard
  } else {
    newGameState.players[token].player_history.show_cards = revealedCard
  }

  newGameState.role_interactions = role_interactions

  return newGameState
}