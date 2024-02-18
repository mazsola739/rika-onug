const { INTERACTION, MESSAGE } = require("../../../constant/ws")
const { getPlayerTokensByPlayerNumber, getPlayerNeighborsByToken, getKeys } = require("../utils")
const { websocketServerConnectionsPerRoom } = require("../../../websocket/connections")
const { updatePlayerCard } = require("../update-player-card")

//? INFO: Thing - Taps the nearest shoulder of the player on their immediate right or left //THING, ANNOYING_LAD
exports.thing = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]

    const neighbors = getPlayerNeighborsByToken(players, token)

    const playerHistory = {
      ...newGameState.actual_scene,
      selectable_cards: neighbors
    }
  
    player.player_history = playerHistory
  
    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    

role_interactions.push({
      type: INTERACTION,
      title,
      token,
      informations: {
        message: ["interaction_must_one_neighbor"],
        icon: 'tap',
        selectable_cards: selectablePlayersWithNoShield,
        selectable_card_limit: { player: 1, center: 0 },
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
  })
  
  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.thing_response = (gameState, token, selected_positions, title) => {
  if (selected_positions.every((position) => gameState.players[token].player_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card

  const tappedPlayerToken = getPlayerTokensByPlayerNumber(players, selected_positions[0])

  //TODO TAPPED icon to the tapped player
  websocketServerConnectionsPerRoom[newGameState.room_id][tappedPlayerToken].send(JSON.stringify({
    type: MESSAGE,
    message: ["message_tapped"],
  }))

  player.player_history.tapped_player = selected_positions[0]

  

role_interactions.push({
    type: INTERACTION,
    title,
    token,
    informations: {
      message: ["interaction_tap", `${selected_positions[0]}`],
      icon: 'tap',
      tapped_player: [selected_positions[0]],
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
