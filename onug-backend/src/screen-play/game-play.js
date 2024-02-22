import { readGameState, upsertRoomState } from '../repository';
import { broadcast, websocketServerConnectionsPerRoom } from '../websocket/connections';
import { HYDRATE_GAME_PLAY } from '../constant/ws';
import { logTrace } from '../log';
import { narration } from '../scene';
import { STAGES } from '../constant/stage';

//TODO set tickTime each narration different

const tickTime = 8000

export const stopGamePlay = gameState => {
  gameState.game_stopped = true
  gameState.stage = STAGES.ROOM

  delete gameState.startTime
  const playerTokens = Object.keys(gameState.players)

  playerTokens.forEach((token) => {
    gameState.players[token] = {
      ...gameState.players[token],
    }
    delete gameState.players[token].player_start_card_id
    delete gameState.players[token].card
    delete gameState.players[token].player_number
    delete gameState.players[token].player_history
    gameState.players[token].ready = false
    
    delete gameState.card_positions
    gameState.action_history = [
      {
        "scene_title": "GAME_START",
        "scene_number": 0
      }]

    delete gameState.game_play_start_time
    delete gameState.actual_scene
  })

  return gameState
};

const getNextScene = gameState => {
  if (!gameState.actual_scene) return // game already stopped

  let newGameState = { ...gameState }
  
  const startTime = Date.now()
  newGameState.actual_scene.scene_start_time = startTime
  newGameState.actual_scene.scene_number++

  newGameState = narration(newGameState)

  newGameState.scene_role_interactions.forEach((scene_role_interaction) => {
    websocketServerConnectionsPerRoom[newGameState.room_id][scene_role_interaction.token].send(JSON.stringify(scene_role_interaction))
  })

  if (newGameState.actual_scene.scene_title === "VOTE") {
    newGameState.game_stopped = true
    return newGameState
  }

  if (!newGameState.actual_scene.started) return getNextScene(newGameState)

  return newGameState
}

const tick = async (room_id) => {
  logTrace("tick")
  const gameState = await readGameState(room_id)
  
  const newGameState = getNextScene(gameState)

  if (!newGameState) return // game already stopped

  //TODO action_history: need narration & interactions
  newGameState.action_history.push(newGameState.actual_scene)

  const actualScene = {
    scene_number: newGameState.actual_scene.scene_number,
    scene_start_time: newGameState.actual_scene.scene_start_time,
    scene_title: newGameState.actual_scene.scene_title,
    narration: newGameState.actual_scene.started
  }

  newGameState.actual_scene = actualScene

  await upsertRoomState(newGameState)

  let nextScene
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

export const startGamePlay = room_id => setTimeout(() => tick(room_id), 2000);
