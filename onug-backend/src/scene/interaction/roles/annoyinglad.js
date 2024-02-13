const { INTERACTION, MESSAGE } = require("../../../constant/ws")
const { getPlayerNeighborsByToken, getPlayerTokenByPlayerNumber, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped } = require("../utils")

//? INFO: Thing - Taps the nearest shoulder of the player on their immediate right or left //THING, ANNOYING_LAD
exports.annoyinglad = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const neighbors = getPlayerNeighborsByToken(newGameState.players, token)

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: neighbors,
  }

  newGameState.players[token].role_history = roleHistory
  newGameState.players[token].card_or_mark_action = false

  const annoyingladPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, annoyingladPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, annoyingladPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[annoyingladPlayerNumber[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[annoyingladPlayerNumber[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[annoyingladPlayerNumber[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[annoyingladPlayerNumber[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  role_interactions.push({
    type: INTERACTION,
    title: "ANNOYING_LAD",
    token,
    message: "interaction_annoyinglad",
    selectable_cards: neighbors,
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

exports.annoyinglad_response = (gameState, token, selected_positions, websocketServerConnectionsPerRoom) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  const tappedPlayerToken = getPlayerTokenByPlayerNumber(newGameState.players, selected_positions[0])

  websocketServerConnectionsPerRoom[room_id][tappedPlayerToken].send(JSON.stringify({
    type: MESSAGE,
    message: "You got tapped by your neighbor"
  }))

  newGameState.players[token].role_history.tapped_player = selected_positions[0]

  role_interactions.push({
    type: INTERACTION,
    title: "ANNOYING_LAD",
    token,
    message: "interaction_annoyinglad2",
    tapped_player: selected_positions[0],
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

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} tapped their neighbor on the next position: ${selected_positions[0]}`

  return newGameState
}
