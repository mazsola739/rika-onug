const { REDIRECT } = require("../constant/ws")
const { logTrace } = require("../log")
const { validateRoom } = require("../validator")
const { repository } = require("../repository")
const { STAGES } = require("../constant/stage")
const { broadcast } = require("./connections")
const { upsertRoomState } = repository
const { startGamePlay } = require("../screen-play")

exports.startGame = async (message) => {
  const { room_id, token } = message
  logTrace(`Everybody is ready, game started in: ${room_id}`)
  // TODO different room validator, should prevent multiple game starts
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid)
    return ws.send(JSON.stringify({ type: REDIRECT, path: '/lobby', errors }))

  const startTime = Date.now()
  let newGameState = {
    ...gameState,
    stage: STAGES.GAME_PLAY,
    startTime,
    actual_scene: {
      scene_title: "JOKE",
      scene_number: 0,
    }
  }

  logTrace(`Game started by player [${token}], in room [${room_id}], with startTime: [${startTime}]`)
  // TODO validate player
  await upsertRoomState(newGameState)

  const startGame = {
    type: REDIRECT,
    path: `/gameplay/${room_id}`
  }
  startGamePlay(gameState.room_id)
  return broadcast(room_id, startGame)
}
