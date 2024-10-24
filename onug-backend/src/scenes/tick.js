import { HYDRATE_GAME, REDIRECT } from '../constants'
import { logDebug, logTrace } from '../log'
import { readGamestate, upsertRoomState } from '../repository'
import { broadcast } from '../websocket/connections'
import { getNextScene } from './getNextScene'

export const tick = async (room_id) => {
  logTrace('tick')
  const gamestate = await readGamestate(room_id)
  if (gamestate?.game_paused) {
    logDebug('Game paused: ', gamestate.game_paused)
    return
  } else {
    logDebug('Game paused: ', gamestate.game_paused)
  }

  const newGamestate = getNextScene(gamestate)

  // TODO check: maybe it's not enough validation any more, if getNextScene not returning null or undefined for gameState, but itás already stopped
  if (!newGamestate) return // game already stopped

  newGamestate.action_history.push(newGamestate.actual_scene)

  const tickTime = newGamestate.actual_scene.scene_end_time - newGamestate.actual_scene.scene_start_time

  const actualScene = {
    scene_number: newGamestate.actual_scene.scene_number,
    scene_start_time: newGamestate.actual_scene.scene_start_time,
    scene_title: newGamestate.actual_scene.scene_title,
    scene_end_time: newGamestate.actual_scene.scene_end_time,
    remaining_time: tickTime,
  }

  newGamestate.actual_scene = actualScene
 
  await upsertRoomState(newGamestate)

  let broadcastMessage
  if (newGamestate.game_stopped) {
    broadcastMessage = {
      type: REDIRECT,
      path: `/vote/${room_id}`,
    }
    logTrace(`broadcast vote scene : ${JSON.stringify(broadcastMessage)}`)
    broadcast(room_id, broadcastMessage)
  } else {
    broadcastMessage = {
      type: HYDRATE_GAME,
      actual_scene: newGamestate.actual_scene,
    }
    logTrace(`broadcast next scene : ${JSON.stringify(broadcastMessage)}`)
    broadcast(room_id, broadcastMessage)
    
    setTimeout(() => tick(room_id), tickTime)
  }
}
