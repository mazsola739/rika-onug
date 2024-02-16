const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getCardIdsByPositions, getPlayerNumbersWithMatchingTokens, isPlayersCardsFlipped, isActivePlayersCardsFlipped, getSelectablePlayersWithNoShield, concatArraysWithUniqueElements , getKeys } = require("../utils")
const { townIds } = require("../constants")

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
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    const player = players[token]
    const flippedCards = newGameState.flipped

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield,
    }

    player.role_history = roleHistory

    const revealerPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, revealerPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, revealerPlayerNumber)
    const playerCard = player?.card
    const currentCard = newGameState.card_positions[revealerPlayerNumber[0]]

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
      title: roleMapping[role_id].title,
      token,
      message: roleMapping[role_id].message,
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 1, center: 0 },
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
  const isTown = townIds.includes(revealedCard)

  player.role_history.card_or_mark_action = true

  const revealerPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const revealerCardInFlippedCards = isActivePlayersCardsFlipped(revealedCard, revealerPlayerNumber)

  if (revealerCardInFlippedCards) {
    playerCard.id = 0
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
    player_original_id: playerCard?.original_id,
    player_card_id: playerCard?.id,
    player_role: playerCard?.role,
    player_role_id: playerCard?.role_id,
    player_team: playerCard?.team,
    player_number: player?.player_number,
  })

  newGameState.actual_scene.interaction = `The player, ${player.player_number}, flipped a card in the next position: ${selected_positions[0]}, and it turned out to be ${isTown ? "a town member" : "a non-town member"}.`

  if (isTown) {
    newGameState.flipped.push(revealedCard)
    newGameState.players[token].role_history.flipped_cards = [revealedCard]
  } else {
    newGameState.players[token].role_history.show_cards = [revealedCard]
  }

  newGameState.role_interactions = role_interactions

  return newGameState
}