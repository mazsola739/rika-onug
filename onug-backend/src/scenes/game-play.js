import { readGamestate, upsertRoomState } from '../repository'
import { broadcast, webSocketServerConnectionsPerRoom } from '../websocket/connections'
import { HYDRATE_GAME, REDIRECT, STAGES } from '../constants'
import { logDebug, logErrorWithStack, logTrace } from '../log'
import { scene } from './scene'

//TODO set tickTime each narration different

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
      path: `/voting/${room_id}`,
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

export const pauseGamePlay = gamestate => {
  const newGamestate = {...gamestate}
  newGamestate.game_paused = !newGamestate.game_paused

  const now = Date.now()
  if (newGamestate.game_paused) {
    const remainingTime = newGamestate.actual_scene.scene_end_time - now
    newGamestate.actual_scene.remaining_time = remainingTime
  } else {
    const newSceneEndTime = now + newGamestate.actual_scene.remaining_time
    newGamestate.actual_scene.scene_end_time = newSceneEndTime

    setTimeout(() => tick(newGamestate.room_id), newGamestate.actual_scene.remaining_time)
  }

  return newGamestate
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
