const { validateRoom } = require("./validator")
const { sceneHandler } = require("./scene-handler")

//TODO RIPPLE

exports.narration = async (ws, message) => {
  const { room_id } = message
  logTrace(`Narration playing for players in room: ${room_id}`)
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

//TODO
//! gameState plan: example1
//!  "actual_scene": {
//!                     "scene_name": "ALIENS",
//!                     "scene_number": "25",
//!             naming? "interaction": "aliens_view",           here can be sending and recieving - naming? RANDOM
//!                   },
//!  example2
//!  "actual_scene": {
//!                     "scene_name": "COW",
//!                     "scene_number": "26",
//!             naming? "interaction": "cow_kickoff",           here can be sending and recieving - naming? SIMPLE
//!                   },

  return sceneHandler(gameState)
}
