const { HYDRATE_GAME_PLAY, REDIRECT } = require("../constant/ws")
const { logTrace } = require("../log")
const { repository } = require("../repository")
const { isGamePlayStopped } = require("../utils")
const { readGameState } = repository

exports.hydrateGamePlay = async (ws, message) => {
  logTrace(`hydrate game play ${JSON.stringify(message)}`)
  
  const { room_id } = message
  const gameState = await readGameState(room_id)

  if (isGamePlayStopped(gameState)) return ws.send(JSON.stringify({ type: REDIRECT, path: `/room/${room_id}` }))

  // TODO get actual scene based on scene_number and player token
  const actual_scene = gameState.actual_scene

  return ws.send(
    JSON.stringify({
      type: HYDRATE_GAME_PLAY,
      actual_scene,
    })
  )
}
