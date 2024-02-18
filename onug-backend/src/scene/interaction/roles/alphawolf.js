const { generateRoleInteractions } = require("../generate-role-interactions")
const { getNonWerewolfPlayerNumbersByRoleIds, getSelectablePlayersWithNoShield } = require("../utils")

//? INFO: Alpha Wolf - Wakes with other Werewolves. Wakes after and exchanges the center Alpha card with any other non-Werewolf player card
exports.alphawolf = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach(token => {
    const players = newGameState.players
    
    const selectablePlayerNumbers = getNonWerewolfPlayerNumbersByRoleIds(players)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)
  
    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ["interaction_one_any_non_werewolf"],
        'claw',
        { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
        null,
        null,
        null,
        null
      )
    )

    const playerHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 }
    }
    players[token].player_history.push(playerHistory)
  })

  return { ...newGameState, role_interactions }
}

//TODO check for null
exports.alphawolf_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const player = newGameState.players[token]
  const cardPositions = newGameState.card_positions

  const centerWolf = { ...cardPositions.center_wolf }
  const selectedCard = { ...cardPositions[selected_positions[0]] }
  cardPositions.center_wolf = selectedCard
  cardPositions[selected_positions[0]] = centerWolf

  player.player_history.swapped_cards = [selected_positions[0], "center_wolf"]
  player.card_or_mark_action = true

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_swapped_cards", selected_positions[0], "center_wolf"],
      'claw',
      null,
      null,
      null,
      null,
      { swapped_cards: [selected_positions[0], 'center_wolf'] }
    )
  ]

  return { ...newGameState, role_interactions }
}

