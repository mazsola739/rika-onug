const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, getCardIdsByPlayerNumbers, concatArraysWithUniqueElements, getKeys } = require("../utils")

//? INFO: Robber - Swaps his card for any other player’s card (not center) which he then looks at
exports.robber = (gameState, tokens, title) => {
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

      const playerHistory = {
        ...newGameState.actual_scene,
        selectable_cards: selectablePlayersWithNoShield,
      }
      player.player_history = playerHistory

      

role_interactions.push({
        type: INTERACTION,
        title,
        token,
        informations: {
          message: ["interaction_may_one_any_other"],
          icon: 'robber',
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
    } else if (newGameState.players[token].card.shield) {
      const playerHistory = {
        ...newGameState.actual_scene,
      }
      player.player_history = playerHistory

      

role_interactions.push({
        type: INTERACTION,
        title,
        token,
        informations: {
          message: ["interaction_shielded"],
          icon: 'shield',
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
    }
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.robber_response = (gameState, token, selected_positions, title) => {
  if (selected_positions.every((position) => gameState.players[token].player_history.selectable_cards.includes(position)) === false) return gameState

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

   player.player_history.swapped_cards = [selected_positions[0], `player_${ player.player_number}`]
   player.player_history.show_cards = showCards
   player.card_or_mark_action = true
//TODO better message


role_interactions.push({
  type: INTERACTION,
  title,
  token,
  informations: {
    message: ["interaction_swapped_cards", "interaction_saw_card", `player_${ player.player_number}`],
    icon: 'robber',
    viewed_cards: `${selected_positions[0]}`,
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

  return newGameState
}