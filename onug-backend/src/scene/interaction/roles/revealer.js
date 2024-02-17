const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getCardIdsByPositions, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, concatArraysWithUniqueElements, getKeys, isActivePlayersCardsFlipped } = require("../utils")
const { townIds } = require("../constants")
const { updatePlayerCard } = require("../update-player-card")

//? INFO: Revealer - Turns and keeps one player's card face up unless they are not on the Villager Team
//TODO doppelganger
exports.revealer = (gameState, tokens, role_id, title) => {
  const roleMapping = {
    1: {
      title,
      message: title === "DOPPELGÄNGER_REVEALER" ? 'interaction_doppelganger_revealer' : 'interaction_doppelganger_flipper'
    },
    24: {
      title,
      message: 'interaction_revealer'
    },
    59: {
      title,
      message: 'interaction_flipper'
    }
  }

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]

    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield,
    }

    player.role_history = roleHistory

    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    role_interactions.push({
      type: INTERACTION,
      title: roleMapping[role_id].title,
      token,
      message: roleMapping[role_id].message,
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 1, center: 0 },
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: flippedCards,
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    })
  })
  
  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.revealer_response = (gameState, token, selected_positions, role_id, title) => {
  const roleMapping = {
    1: {
      title: title === "DOPPELGÄNGER_REVEALER" ? 'interaction_doppelganger_revealer' : 'interaction_doppelganger_flipper',
      message: 'interaction_doppelganger_revealer2'
    },
    24: {
      title,
      message: 'interaction_revealer2'
    },
    59: {
      title,
      message: 'interaction_flipper2'
    }
  }

  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card
  const cardPositions =  newGameState.card_positions

  const revealedCard = getCardIdsByPositions(cardPositions, [selected_positions[0]])
  const isTown = revealedCard.every(card => townIds.includes(Object.values(card)[0]))

  player.role_history.card_or_mark_action = true

  const revealerPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const revealerCardInFlippedCards = isActivePlayersCardsFlipped(revealedCard, revealerPlayerNumber)

  if (revealerCardInFlippedCards) {
    playerCard.player_card_id = 0
  }

  role_interactions.push({
    type: INTERACTION,
    title: roleMapping[role_id].title,
    token,
    message: roleMapping[role_id].message,
    shielded_cards: newGameState.shield,
    artifacted_cards: getKeys(newGameState.artifact),
    show_cards: concatArraysWithUniqueElements(revealedCard, newGameState.flipped),
    player_name: player?.name,
    player_number: player?.player_number,
    ...playerCard,
  })

  newGameState.actual_scene.interaction = `The player, ${player.player_number}, flipped a card in the next position: ${selected_positions[0]}, and it turned out to be ${isTown ? "a town member" : "a non-town member"}.`

  if (isTown) {
    newGameState.flipped.push(revealedCard[0])
    newGameState.players[token].role_history.flipped_cards = revealedCard
  } else {
    newGameState.players[token].role_history.show_cards = revealedCard
  }

  newGameState.role_interactions = role_interactions

  return newGameState
}