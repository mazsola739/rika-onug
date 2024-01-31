const { REDIRECT } = require("../constant/ws")
const { logTrace } = require("../log")
const { validateRoom } = require("../validator")
const { repository } = require("../repository")
const { STAGES } = require("../constant/stage")
const { broadcast } = require("./connections")
const { stopGamePlay } = require("../screen-play")
const { upsertRoomState } = repository

exports.stopGame = async (message) => {
  const { room_id, token } = message
  logTrace(`game stop requested in: ${room_id}`)
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid) return broadcast({ type: REDIRECT, path: '/lobby', errors })

  // TODO validate if player is admin and in the room
  const newGameState = {
    ...gameState,
    stage: STAGES.ROOM,
  }

  delete newGameState.startTime

  const playerTokens = Object.keys(newGameState.players)

  playerTokens.forEach((token) => {
    newGameState.players[token] = {
      ...newGameState.players[token],
    }
    delete newGameState.players[token].player_start_card_id
    delete newGameState.players[token].card
    delete newGameState.players[token].player_number
    newGameState.players[token].ready = false
  })
  logTrace(`Game stopped by player [${token}], in room [${room_id}]`)

  await upsertRoomState(newGameState)

  const stopGame = {
    type: REDIRECT,
    path: `/room/${room_id}`
  }

  stopGamePlay()
  
  return broadcast(room_id, stopGame)
}
