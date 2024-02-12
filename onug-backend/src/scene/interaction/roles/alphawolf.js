const { INTERACTION } = require("../../../constant/ws")
const { getNonWerewolfPlayerNumbersByRoleIds, getSelectablePlayersWithNoShield } = require("../utils")

//? INFO: Alpha Wolf - Wakes with other Werewolves. Wakes after and exchanges the center Alpha card with any other non-Werewolf player card
exports.alphawolf = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const selectablePlayerNumbers = getNonWerewolfPlayerNumbersByRoleIds(newGameState.players)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayersWithNoShield,
  }

  newGameState.players[token].role_history = roleHistory
  newGameState.players[token].card_or_mark_action = false

  role_interactions.push({
    type: INTERACTION,
    title: "ALPHA_WOLF",
    token,
    message: "interaction_alphawolf",
    selectable_cards: selectablePlayersWithNoShield,
    shielded_players: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.alphawolf_response = (gameState, token, selected_positions) => {
  const { players, shield, card_positions } = gameState

  if (!players[token].role_history.selectable_cards.includes(selected_positions[0])) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  const [centerWolf, selectedPlayer] = [card_positions.center_wolf, card_positions[selected_positions[0]]]
  ;[card_positions.center_wolf, card_positions[selected_positions[0]]] = [selectedPlayer, centerWolf]

  newGameState.players[token].role_history.swapped_cards = [selected_positions[0], "center wolf"]
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "ALPHA_WOLF",
    token,
    message: "interaction_alphawolf2",
    swapped_cards: [selected_positions[0], "center wolf"],
    shielded_players: shield,
  })

  newGameState.role_interactions = role_interactions
  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} swapped cards between positions: player ${selected_positions[0]} and center wolf`

  return newGameState
}
