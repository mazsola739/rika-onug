const { repository } = require("../repository")
const { readGameState, upsertRoomState } = repository
const { broadcast, websocketServerConnectionsPerRoom } = require("../websocket/connections")
const { HYDRATE_GAME_PLAY } = require("../constant/ws")
const { logTrace, logError } = require("../log")
const { narration, interaction } = require("../scene")

const tickTime = 3000

//todo here: game_stopped = false
exports.stopGamePlay = () => logTrace("TODO stop game implementation")

const getNextScene = gameState => {
  let newGameState = { ...gameState }

  const startTime = Date.now()
  newGameState.actual_scene.scene_start_time = startTime

  newGameState.actual_scene.scene_number++

  newGameState = narration(newGameState)
  newGameState = interaction(newGameState)

  newGameState.role_interactions.forEach((role_interaction) => {
    websocketServerConnectionsPerRoom[newGameState.room_id][role_interaction.token].send(JSON.stringify(role_interaction))
  })

  if (newGameState.actual_scene.scene_title === "VOTE") {
    newGameState.game_stopped = true
    return newGameState
  }

  if (!newGameState.actual_scene.narration) return getNextScene(newGameState)

  return newGameState
}

const tick = async (room_id) => {
  logTrace("tick")
  const gameState = await readGameState(room_id)
  const newGameState = getNextScene(gameState)

  //TODO action_history: need narration & interactions
  newGameState.action_history.push(newGameState.actual_scene)

  const actualScene = {
    scene_number: newGameState.actual_scene.scene_number,
    scene_start_time: newGameState.actual_scene.scene_start_time,
    scene_title: newGameState.actual_scene.scene_title,
    narration: newGameState.actual_scene.narration
  }

  newGameState.actual_scene = actualScene

  await upsertRoomState(newGameState)

  let nextScene = {}
  if (newGameState.game_stopped) {
    nextScene = {
      type: HYDRATE_GAME_PLAY, // TODO decide whether we need to redirect or stay on gameplay for vote
      actual_scene: newGameState.actual_scene,
    }
    logTrace(`broadcast vote scene : ${JSON.stringify(nextScene)}`)
    broadcast(room_id, nextScene)
  } else {
    nextScene = {
      type: HYDRATE_GAME_PLAY,
      actual_scene: newGameState.actual_scene,
    }
    logTrace(`broadcast next scene : ${JSON.stringify(nextScene)}`)
    broadcast(room_id, nextScene)

    setTimeout(() => tick(room_id), tickTime)
  }
}

exports.startGamePlay = room_id => setTimeout(() => tick(room_id), tickTime)
