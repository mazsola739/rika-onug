const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getNonWerewolfPlayerNumbersByRoleIds, getSelectablePlayersWithNoShield, getKeys } = require("../utils")

//? INFO: Alpha Wolf - Wakes with other Werewolves. Wakes after and exchanges the center Alpha card with any other non-Werewolf player card
exports.alphawolf = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const selectablePlayerNumbers = getNonWerewolfPlayerNumbersByRoleIds(players)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  tokens.forEach((token) => {
    const player = players[token]

    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    role_interactions.push({
      type: INTERACTION,
      title: "ALPHA_WOLF",
      token,
      message: "interaction_alphawolf",
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 1, center: 0 },
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: flippedCards,
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    })

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield,
    }
    player.player_history.push(roleHistory)
  })
  newGameState.role_interactions = role_interactions
  
  return newGameState
}

//TODO check for null
exports.alphawolf_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card
  const cardPositions =  newGameState.card_positions

  const centerWolf = { ...cardPositions.center_wolf }
  const selectedCard = { ...cardPositions[selected_positions[0]] }
  cardPositions.center_wolf = selectedCard
  cardPositions[selected_positions[0]] = centerWolf

  player.role_history.swapped_cards = [selected_positions[0], "center wolf"]
  player.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "ALPHA_WOLF",
    token,
    message: "interaction_alphawolf2",
    swapped_cards: [selected_positions[0], "center wolf"],
    shielded_cards: newGameState.shield,
    artifacted_cards: getKeys(newGameState.artifact),
    show_cards: newGameState.flipped,
    player_name: player?.name,
    player_number: player?.player_number,
    ...playerCard,
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}
