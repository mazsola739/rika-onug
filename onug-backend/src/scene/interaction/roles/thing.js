const { INTERACTION, MESSAGE } = require("../../../constant/ws")
const { getPlayerTokenByPlayerNumber, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped, getPlayerNeighborsByToken } = require("../utils")
const { websocketServerConnectionsPerRoom } = require("../../../websocket/connections")

//? INFO: Thing - Taps the nearest shoulder of the player on their immediate right or left //THING, ANNOYING_LAD
exports.thing = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const roleHistory = {
      ...newGameState.actual_scene,
    }
  
    newGameState.players[token].role_history = roleHistory
      
  
  
    role_interactions.push({
      type: INTERACTION,
      title: "",
      token,
      message: "interaction_",
      
      selectable_limit: { player: 1, center: 0 },
      shielded_cards: newGameState.shield,
      player_name: newGameState.players[token]?.name,
      player_original_id: newGameState.players[token]?.card?.original_id,
      player_card_id: newGameState.players[token]?.card?.id,
      player_role: newGameState.players[token]?.card?.role,
      player_role_id: newGameState.players[token]?.card?.role_id,
      player_team: newGameState.players[token]?.card?.team,
      player_number: newGameState.players[token]?.player_number,
    })
  
   // newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} saw Mason position(s): player ${masonPlayerNumbers.join(', ')}`
  })
  
    newGameState.role_interactions = role_interactions

  const neighbors = getPlayerNeighborsByToken(newGameState.players, token)

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: neighbors,
  }

  newGameState.players[token].role_history = roleHistory
  
  const thingPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, thingPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, thingPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[thingPlayerNumber[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[thingPlayerNumber[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[thingPlayerNumber[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[thingPlayerNumber[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  role_interactions.push({
    type: INTERACTION,
    title: "THING",
    token,
    message: "interaction_thing",
    selectable_cards: neighbors,
    shielded_cards: newGameState.shield,
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

exports.thing_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  const tappedPlayerToken = getPlayerTokenByPlayerNumber(newGameState.players, selected_positions[0])

  websocketServerConnectionsPerRoom[newGameState.room_id][tappedPlayerToken].send(JSON.stringify({
    type: MESSAGE,
    message: "You got tapped by your neighbor",
  }))

  newGameState.players[token].role_history.tapped_player = selected_positions[0]

  role_interactions.push({
    type: INTERACTION,
    title: "THING",
    token,
    message: "interaction_thing2",
    tapped_player: selected_positions[0],
    shielded_cards: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} tapped their neighbor on the next position: ${selected_positions[0]}`

  return newGameState
}
