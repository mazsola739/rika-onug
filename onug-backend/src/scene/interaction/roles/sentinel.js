const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getKeys, getPlayerTokenByPlayerNumber } = require("../utils")

//? INFO: Sentinel - Place a Shield token on any other player's card that card (not mark) cannot be looked at or moved
//! MARK_OF_FEAR
exports.sentinel = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]

    const selectablePlayerNumber = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumber, newGameState.shield)

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
        icon: 'shield',
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

exports.sentinel_response = (gameState, token, selected_positions, title) => {
  if (selected_positions.every((position) => gameState.players[token].player_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  newGameState.shield.push(selected_positions[0])
  const shieldedPlayerToken = getPlayerTokenByPlayerNumber(players, selected_positions[0])
  players[shieldedPlayerToken].shield = true

  const player = players[token]
  const playerCard = player?.card
  player.player_history.shielded_card = selected_positions[0]

  

role_interactions.push({
    type: INTERACTION,
    title,
    token,
    informations: {
      message: ["interaction_placed_shield", `${selected_positions[0]}`],
      icon: 'shield',
      new_shield_card: [selected_positions[0]],
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
  newGameState.role_interactions = role_interactions

  return newGameState
}
