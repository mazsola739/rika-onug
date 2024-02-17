const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, getCardIdsByPlayerNumbers, concatArraysWithUniqueElements, getKeys } = require("../utils")

//? INFO: Robber - Swaps his card for any other player’s card (not center) which he then looks at
exports.robber = (gameState, tokens, role_id, title) => {
  const roleMapping = {
    8: {
      title,
      message: 'interaction_robber'
    },
    66: {
      title,
      message: 'interaction_roleretriever'
    }
  }

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]

    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    if (!playerCard.shield) {
      const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, token)
      const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

      const roleHistory = {
        ...newGameState.actual_scene,
        selectable_cards: selectablePlayersWithNoShield,
      }
      player.role_history = roleHistory

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
        player_original_id: playerCard?.player_original_id,
        player_card_id: playerCard?.player_card_id,
        player_role: playerCard?.player_role,
        player_role_id: playerCard?.player_role_id,
        player_team: playerCard?.player_team,
        player_number: player?.player_number,
      })
    } else if (newGameState.players[token].card.shield) {
      const roleHistory = {
        ...newGameState.actual_scene,
      }
      player.role_history = roleHistory

      role_interactions.push({
        type: INTERACTION,
        title: roleMapping[role_id].title,
        token,
        message: "interaction_shielded",
        selectable_card_limit: { player: 0, center: 0 },
        shielded_cards: newGameState.shield,
        artifacted_cards: getKeys(newGameState.artifact),
        show_cards: flippedCards,
        player_name: player?.name,
        player_original_id: playerCard?.player_original_id,
        player_card_id: playerCard?.player_card_id,
        player_role: playerCard?.player_role,
        player_role_id: playerCard?.player_role_id,
        player_team: playerCard?.player_team,
        player_number: player?.player_number,
      })

      newGameState.actual_scene.interaction = `The player ${player.player_number} has shield, can't swap their card`
    }
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.robber_response = (gameState, token, selected_positions, role_id) => {
  const roleMapping = {
    8: {
      title: 'ROBBER',
      message: 'interaction_robber2'
    },
    66: {
      title: 'ROLE_RETRIEVER',
      message: 'interaction_roleretriever2'
    }
  }

  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card
  const cardPositions =  newGameState.card_positions

  const robberPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])

  const robberCard = { ...cardPositions[robberPlayerNumber] }
  const selectedCard = { ...cardPositions[selected_positions[0]] }
  cardPositions[robberPlayerNumber] = selectedCard
  cardPositions[selected_positions[0]] = robberCard
  playerCard.player_card_id = cardPositions[robberPlayerNumber].id
  playerCard.player_team = cardPositions[robberPlayerNumber].team

  const showCards = getCardIdsByPlayerNumbers(cardPositions, robberPlayerNumber)

   player.role_history.swapped_cards = [selected_positions[0], `player_${ player.player_number}`]
   player.role_history.show_cards = showCards
   player.role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: roleMapping[role_id].title,
    token,
    message: roleMapping[role_id].message,
    show_cards: concatArraysWithUniqueElements(showCards, newGameState.flipped),
    shielded_cards: newGameState.shield,
    artifacted_cards: getKeys(newGameState.artifact),
    player_name: player?.name,
    player_number: player?.player_number,
    ...playerCard,
  })

  newGameState.role_interactions = role_interactions
  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} swapped their card with ${selected_positions[0]} and then viewed their new card`

  return newGameState
}