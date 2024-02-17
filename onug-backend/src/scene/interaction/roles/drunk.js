const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped, getKeys } = require("../utils")
const { centerCardPositions } = require("../constants")
const { updatePlayerCard } = require("../update-player-card")

//? INFO: Drunk – Swap your card with a card from center but does not look at his new card
exports.drunk = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    updatePlayerCard(newGameState, token)

    if (!playerCard.shield) {
      const roleHistory = {
        ...newGameState.actual_scene,
        selectable_cards: centerCardPositions,
      }
      player.role_history = roleHistory

      role_interactions.push({
        type: INTERACTION,
        title: "DRUNK",
        token,
        message: "interaction_drunk",
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
    } else {
      role_interactions.push({
        type: INTERACTION,
        title: "DRUNK",
        token,
        message: "interaction_shielded",
        selectable_card_limit: { player: 0, center: 0 },
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

      newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} cannot swap cards due to having a shield.`
    }
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.drunk_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

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
  player.card.id = 0

  player.role_history.swapped_cards = [selected_positions[0], `player_${ player.player_number}`]
  player.role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "DRUNK",
    token,
    message: "interaction_drunk_response",
    swapped_cards: [`player_${player.player_number}`, `${selected_positions[0]}`],
    show_cards: newGameState.flipped,
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
  newGameState.actual_scene.interaction = `The player ${player.player_number} swapped their card with ${selected_positions[0]}`

  return newGameState
}
