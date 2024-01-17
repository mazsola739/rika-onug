const { PLAY_GAME } = require("../constant/ws")
const { logTrace } = require("../log")
const { validateRoom } = require("../validator")

exports.playGame = async (ws, message) => {
  const { room_id, token } = message
  logTrace(`Game started in room: ${room_id}`)
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid)
    return ws.send(
      JSON.stringify({ type: PLAY_GAME, errors,  success: false })
    )

  const player = gameState.players[token]
  // TODO validate player
  const playGame = JSON.stringify({
    type: PLAY_GAME,
    room_id: gameState.room_id,
    selected_cards: gameState.selected_cards,
    player_name: player.name,
    player_card_id: gameState.selected_cards[0], // TODO assign random card to all players, after that populate this from player instead of selected cards
  })
  logTrace(`sending message to client, play game: ${playGame}`) 
  return ws.send(playGame)
}
