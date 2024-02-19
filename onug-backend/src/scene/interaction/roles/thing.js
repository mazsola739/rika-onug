const { MESSAGE } = require("../../../constant/ws")
const { getPlayerTokensByPlayerNumber, getPlayerNeighborsByToken } = require("../utils")
const { websocketServerConnectionsPerRoom } = require("../../../websocket/connections")
const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { isValidSelection } = require("../validate-response-data")

//? INFO: Thing - Taps the nearest shoulder of the player on their immediate right or left //THING, ANNOYING_LAD
exports.thing = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const { players, actual_scene } = newGameState
    const player = players[token]

    const neighbors = getPlayerNeighborsByToken(players, token)

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ["interaction_must_one_neighbor"],
        'tap',
        { selectable_cards: neighbors, selectable_card_limit: { player: 1, center: 0 } },
        null,
        null,
        null,
        null,
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: neighbors, selectable_card_limit: { player: 1, center: 0 },
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
}

exports.thing_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const { players } = newGameState
  const player = players[token]

  const tappedPlayerToken = getPlayerTokensByPlayerNumber(players, selected_positions[0])
  //TODO TAPPED icon to the tapped player
  websocketServerConnectionsPerRoom[newGameState.room_id][tappedPlayerToken].send(JSON.stringify({
    type: MESSAGE,
    message: ["message_tapped"],
  }))

  player.player_history.tapped_player = selected_positions[0]

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_tap", selected_positions[0]],
      'tap',
      null,
      null,
      null,
      null,
      { tapped_player: [selected_positions[0]] }
    )
  ]

  return { ...newGameState, role_interactions }
}
