const { validateRoom } = require("../validator")
const { determineTotalPlayers, toggleCard } = require("../utils")
const { repository } = require("../repository")
const { upsertRoomState } = repository
const { HYDRATE_ROOM } = require("../constant/ws")
const { broadcast } = require("./connections")

exports.updateRoom = async (message) => {
  const { room_id, card_id, token } = message
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors })
  const newGameState = { ...gameState }
  let totalPlayers = determineTotalPlayers(newGameState.selected_cards.length, newGameState.selected_cards)
  // TODO validate if player is admin
  newGameState.selected_cards = toggleCard(
    newGameState.selected_cards,
    card_id,
    totalPlayers
  )

  totalPlayers = determineTotalPlayers(newGameState.selected_cards.length, newGameState.selected_cards)

  if (totalPlayers > 12) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors: ["Cannot have more than 12 players."] })

  upsertRoomState(newGameState)
  
  return broadcast(room_id, { type: HYDRATE_ROOM, success: true, selected_cards: newGameState.selected_cards })
}
