import { readGamestate, upsertRoomState } from '../repository'
import { broadcast, webSocketServerConnectionsPerRoom } from '../websocket/connections'
import { HYDRATE_GAME_PLAY, REDIRECT, STAGES } from '../constants'
import { logErrorWithStack, logTrace } from '../log'
import { scene } from './scene'

//TODO set tickTime each narration different
//TODO pauseGamePlay

const getNextScene = gamestate => {
  try {
    if (!gamestate.actual_scene) return // game already stopped

    let newGamestate = { ...gamestate }

    const startTime = Date.now()
    newGamestate.actual_scene.scene_start_time = startTime
    newGamestate.actual_scene.scene_number++

    newGamestate = scene(newGamestate)

    newGamestate.scene.forEach((item) => {
      webSocketServerConnectionsPerRoom[newGamestate.room_id][item.token].send(
        JSON.stringify(item)
      )
    })

    if (newGamestate.actual_scene.scene_title === 'VOTE') {
      newGamestate.game_stopped = true
      return newGamestate
    }

    if (!newGamestate.actual_scene.started) return getNextScene(newGamestate)

    return newGamestate
  } catch (error) {
    logErrorWithStack(error)
    return
  }
}

const tick = async (room_id) => {
  logTrace('tick')
  const gamestate = await readGamestate(room_id)

  const newGamestate = getNextScene(gamestate)

  if (!newGamestate) return // game already stopped

  newGamestate.action_history.push(newGamestate.actual_scene)

  const actualScene = {
    scene_number: newGamestate.actual_scene.scene_number,
    scene_start_time: newGamestate.actual_scene.scene_start_time,
    scene_title: newGamestate.actual_scene.scene_title,
    scene_end_time: newGamestate.actual_scene.scene_end_time,
  }

  newGamestate.actual_scene = actualScene

  const tickTime = newGamestate.actual_scene.scene_end_time - newGamestate.actual_scene.scene_start_time

  await upsertRoomState(newGamestate)

  let broadcastMessage
  if (newGamestate.game_stopped) {
    broadcastMessage = {
      type: REDIRECT,
      path: `/gamevote/${room_id}`,
    }
    logTrace(`broadcast vote scene : ${JSON.stringify(broadcastMessage)}`)
    broadcast(room_id, broadcastMessage)
  } else {
    broadcastMessage = {
      type: HYDRATE_GAME_PLAY,
      actual_scene: newGamestate.actual_scene,
    }
    logTrace(`broadcast next scene : ${JSON.stringify(broadcastMessage)}`)
    broadcast(room_id, broadcastMessage)
    
    setTimeout(() => tick(room_id), tickTime)
  }
}

export const stopGamePlay = gamestate => {
  gamestate.game_stopped = true
  gamestate.stage = STAGES.ROOM

  delete gamestate.startTime
  const playerTokens = Object.keys(gamestate.players)

  playerTokens.forEach((token) => {
    gamestate.players[token] = { ...gamestate.players[token] }
    delete gamestate.players[token].player_start_card_id
    delete gamestate.players[token].card
    delete gamestate.players[token].player_number
    delete gamestate.players[token].player_history
    gamestate.players[token].ready = false

    delete gamestate.card_positions
    delete gamestate.mark_positions
    gamestate.action_history = []

    delete gamestate.game_play_start_time
    delete gamestate.actual_scene
  })

  return gamestate
}

export const startGamePlay = (room_id) => setTimeout(() => tick(room_id), 2000)
