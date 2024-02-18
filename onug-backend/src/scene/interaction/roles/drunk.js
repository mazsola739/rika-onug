const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithMatchingTokens, getKeys } = require("../utils")
const { centerCardPositions } = require("../constants")
const { updatePlayerCard } = require("../update-player-card")

//? INFO: Drunk – Swap your card with a card from center but does not look at his new card
exports.drunk = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]

    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    if (!playerCard.shield) {
      const playerHistory = {
        ...newGameState.actual_scene,
        selectable_cards: centerCardPositions,
      }
      player.player_history = playerHistory

      

role_interactions.push({
        type: INTERACTION,
        title,
        token,
        informations: {
          message: ["interaction_must_one_center"],
          icon: 'drunk',
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
    } else {
      

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

exports.drunk_response = (gameState, token, selected_positions, title) => {
  if (selected_positions.every((position) => gameState.players[token].player_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card
  const cardPositions =  newGameState.card_positions
  const selectedPositionCard = cardPositions[selected_positions[0]]

  const drunkPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])

  const drunkCard = { ...cardPositions[drunkPlayerNumber] }
  const selectedCard = { ...selectedPositionCard }
  cardPositions[drunkPlayerNumber] = selectedCard
  cardPositions[selected_positions[0]] = drunkCard
  player.card.player_card_id = 0

  player.player_history.swapped_cards = [selected_positions[0], `player_${ player.player_number}`]
  player.card_or_mark_action = true

  

role_interactions.push({
    type: INTERACTION,
    title,
    token,
    informations: {
      message: ["interaction_swapped_cards",  `${selected_positions[0]}`, `player_${ player.player_number}`],
      icon: 'drunk',
      swapped_cards: [`player_${player.player_number}`, `${selected_positions[0]}`],
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
