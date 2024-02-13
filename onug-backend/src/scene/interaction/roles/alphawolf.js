const { INTERACTION } = require("../../../constant/ws")
const { getNonWerewolfPlayerNumbersByRoleIds, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")
const { logError } = require("../../../log")

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

  const alphawolfPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, alphawolfPlayerNumbers)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, alphawolfPlayerNumbers)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[alphawolfPlayerNumbers[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[alphawolfPlayerNumbers[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[alphawolfPlayerNumbers[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[alphawolfPlayerNumbers[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  role_interactions.push({
    type: INTERACTION,
    title: "ALPHA_WOLF",
    token,
    message: "interaction_alphawolf",
    selectable_cards: selectablePlayersWithNoShield,
    shielded_players: newGameState.shield,
    show_cards: newGameState.flipped,
    player_name: newGameState.players[token]?.name,
    player_original_id: newGameState.players[token]?.card?.original_id,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.alphawolf_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  const [centerWolf, selectedPlayer] = [newGameState.card_positions.center_wolf, newGameState.card_positions[selected_positions[0]]]
  ;[newGameState.card_positions.center_wolf, newGameState.card_positions[selected_positions[0]]] = [selectedPlayer, centerWolf]

  newGameState.players[token].role_history.swapped_cards = [selected_positions[0], "center wolf"]
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "ALPHA_WOLF",
    token,
    message: "interaction_alphawolf2",
    swapped_cards: [selected_positions[0], "center wolf"],
    shielded_players: newGameState.shield,
    show_cards: newGameState.flipped,
    player_name: newGameState.players[token]?.name,
    player_original_id: newGameState.players[token]?.card?.original_id,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })

  newGameState.role_interactions = role_interactions
  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} swapped cards between positions: player ${selected_positions[0]} and center wolf`

  return newGameState
}
