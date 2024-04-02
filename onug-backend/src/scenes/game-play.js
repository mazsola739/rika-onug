//@ts-check
import { readGameState, upsertRoomState } from '../repository'
import { broadcast, websocketServerConnectionsPerRoom } from '../websocket/connections'
import { HYDRATE_GAME_PLAY, REDIRECT, STAGES } from '../constant'
import { logErrorWithStack, logTrace } from '../log'
import { scene } from './scene'

//TODO set tickTime each narration different
//TODO pauseGamePlay

const getNextScene = gameState => {
  try {
    if (!gameState.actual_scene) return // game already stopped

    let newGameState = { ...gameState }

    const startTime = Date.now()
    newGameState.actual_scene.scene_start_time = startTime
    newGameState.actual_scene.scene_number++

    newGameState = scene(newGameState)

    newGameState.scene.forEach((item) => {
      websocketServerConnectionsPerRoom[newGameState.room_id][item.token].send(
        JSON.stringify(item)
      )
    })

    if (newGameState.actual_scene.scene_title === 'VOTE') {
      newGameState.game_stopped = true
      return newGameState
    }

    if (!newGameState.actual_scene.started) return getNextScene(newGameState)

    return newGameState
  } catch (error) {
    logErrorWithStack(error)
    return
  }
}

const tick = async (room_id) => {
  logTrace('tick')
  const gameState = await readGameState(room_id)

  const newGameState = getNextScene(gameState)

  if (!newGameState) return // game already stopped

  newGameState.action_history.push(newGameState.actual_scene)

  const actualScene = {
    scene_number: newGameState.actual_scene.scene_number,
    scene_start_time: newGameState.actual_scene.scene_start_time,
    scene_title: newGameState.actual_scene.scene_title,
    scene_end_time: newGameState.actual_scene.scene_end_time,
  }

  newGameState.actual_scene = actualScene

  const tickTime = newGameState.actual_scene.scene_end_time - newGameState.actual_scene.scene_start_time

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
}

export const stopGamePlay = gameState => {
  gameState.game_stopped = true
  gameState.stage = STAGES.ROOM

  delete gameState.startTime
  const playerTokens = Object.keys(gameState.players)

  playerTokens.forEach((token) => {
    gameState.players[token] = { ...gameState.players[token] }
    delete gameState.players[token].player_start_card_id
    delete gameState.players[token].card
    delete gameState.players[token].player_number
    delete gameState.players[token].player_history
    gameState.players[token].ready = false

    delete gameState.card_positions
    delete gameState.mark_positions
    gameState.action_history = []

    delete gameState.game_play_start_time
    delete gameState.actual_scene
  })

  return gameState
}

export const startGamePlay = (room_id) => setTimeout(() => tick(room_id), 2000)
