const { validateRoom } = require("../validator")
const { determineTotalPlayers, selectCard, deselectCard } = require("../utils")
const { repository } = require("../repository")
const { upsertRoomState } = repository
const { UPDATE_SELECT, CARD_SELECT, CARD_DESELECT } = require("../constant/ws")

exports.updateSelect = async (ws, message) => {
  const { room_id, card_id, action, token } = message
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid)
    return ws.send(
      JSON.stringify({ type: UPDATE_SELECT, errors, success: false })
    )

  const totalPlayers = determineTotalPlayers(
    gameState.selected_cards.length,
    gameState.selected_cards
  )

  if (totalPlayers > 12) {
    return ws.send(
      JSON.stringify({
        type: UPDATE_SELECT,
        error: "Cannot have more than 12 players.",
        success: false,
      })
    )
  }

  const newGameState = { ...gameState }

  // TODO validate if player is admin
  // TODO toggle
  if (action === CARD_SELECT) {
    newGameState.selected_cards = selectCard(
      newGameState.selected_cards,
      card_id
    )
  } else if (action === CARD_DESELECT) {
    newGameState.selected_cards = deselectCard(
      newGameState.selected_cards,
      card_id
    )
  }

  upsertRoomState(newGameState)
  ws.send(
    JSON.stringify({
      type: UPDATE_SELECT,
      success: true,
    })
  )
}
