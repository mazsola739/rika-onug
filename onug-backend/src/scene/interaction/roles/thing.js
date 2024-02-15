const { INTERACTION, MESSAGE } = require("../../../constant/ws")
const { getPlayerTokenByPlayerNumber, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped, getPlayerNeighborsByToken } = require("../utils")
const { websocketServerConnectionsPerRoom } = require("../../../websocket/connections")

//? INFO: Thing - Taps the nearest shoulder of the player on their immediate right or left //THING, ANNOYING_LAD
exports.thing = (gameState, tokens, title) => {
  const roleMapping = {
    'ANNOYING_LAD': 'interaction_annoyinglad',
    'THING': 'interaction_thing'
  }

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]
    const flippedCards = newGameState.flipped
    const neighbors = getPlayerNeighborsByToken(players, token)

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: neighbors
    }
  
  player.role_history = roleHistory
  
  const thingPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, thingPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, thingPlayerNumber)
  const playerCard = player?.card

  if (iSeeMyCardIsFlipped) {
    const positionCard = newGameState.card_positions[thingPlayerNumber[0]]
    playerCard.id = positionCard.id
    playerCard.role_id = positionCard.id
    playerCard.role = positionCard.role
    playerCard.team = positionCard.team
  } else if (iSeeMyCardElsewhere) {
    playerCard.id = 0
  }

  role_interactions.push({
    type: INTERACTION,
    title,
    token,
    message: roleMapping[title],
    selectable_cards: neighbors,
    selectable_card_limit: { player: 1, center: 0 },
    shielded_cards: newGameState.shield,
    show_cards: flippedCards,
    player_name: player?.name,
    player_original_id: playerCard?.original_id,
    player_card_id: playerCard?.id,
    player_role: playerCard?.role,
    player_role_id: playerCard?.role_id,
    player_team: playerCard?.team,
    player_number: player?.player_number,
  })
  })
  
  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.thing_response = (gameState, token, selected_positions, title) => {
  const roleMapping = {
    'ANNOYING_LAD': 'interaction_annoyinglad2',
    'THING': 'interaction_thing2'
  }
  
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card

  const tappedPlayerToken = getPlayerTokenByPlayerNumber(players, selected_positions[0])

  //TODO TAPPED icon to the tapped player
  websocketServerConnectionsPerRoom[newGameState.room_id][tappedPlayerToken].send(JSON.stringify({
    type: MESSAGE,
    message: "You got tapped by your neighbor",
  }))

  player.role_history.tapped_player = selected_positions[0]

  role_interactions.push({
    type: INTERACTION,
    title,
    token,
    message: roleMapping[title],
    tapped_player: [selected_positions[0]],
    shielded_cards: newGameState.shield,
    show_cards: newGameState.flipped,
    player_name: player?.name,
    player_original_id: playerCard?.original_id,
    player_card_id: playerCard?.id,
    player_role: playerCard?.role,
    player_role_id: playerCard?.role_id,
    player_team: playerCard?.team,
    player_number: player?.player_number,
  })

  newGameState.role_interactions = role_interactions
  newGameState.actual_scene.interaction = `The player ${player.player_number} tapped their neighbor on the next position: ${selected_positions[0]}`

  return newGameState
}
