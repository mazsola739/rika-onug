//@ts-check
import { HYDRATE_GAME_VOTE, REDIRECT } from '../constant'
import { logTrace } from '../log'
import { readGameState } from '../repository'
import { isGamePlayStopped } from '../utils'

export const hydrateGameVote = async (ws, message) => {
  logTrace(`hydrate game vote ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gameState = await readGameState(room_id)
  const newGameState = {...gameState}

  if (isGamePlayStopped(gameState))
    return ws.send(
      JSON.stringify({ type: REDIRECT, path: `/room/${room_id}` })
    )

  // TODO get actual scene based on scene_number and player token
  const actual_scene = newGameState.actual_scene

  return ws.send(
    JSON.stringify({
      type: HYDRATE_GAME_VOTE,
      actual_scene,
    })
  )
}


/* const tick = async (room_id) => {
  logTrace('tick')
  const gameState = await readGameState(room_id)

  const newGameState = getNextScene(gameState)

  if (!newGameState) return // game already stopped

  newGameState.action_history.push(newGameState.actual_scene)

  const actualScene = {
    scene_number: newGameState.actual_scene.scene_number,
    scene_start_time: newGameState.actual_scene.scene_start_time,
    scene_title: newGameState.actual_scene.scene_title,
  }

  newGameState.actual_scene = actualScene

  await upsertRoomState(newGameState)

  let broadcastMessage
  if (newGameState.game_stopped) {
    broadcastMessage = {
      type: REDIRECT,
      path: `/gamevote/${room_id}`,
    }
    logTrace(`broadcast vote scene : ${JSON.stringify(broadcastMessage)}`)
    broadcast(room_id, broadcastMessage)
  } else {
    broadcastMessage = {
      type: HYDRATE_GAME_PLAY,
      actual_scene: newGameState.actual_scene,
    }
    logTrace(`broadcast next scene : ${JSON.stringify(broadcastMessage)}`)
    broadcast(room_id, broadcastMessage)

    setTimeout(() => tick(room_id), tickTime)
  }
} */