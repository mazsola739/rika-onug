import { REDIRECT, STAGES } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { startScene } from '../scenes'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

const initializeGameState = (gamestate) => {
  const startTime = Date.now()
  return {
    ...gamestate,
    stage: STAGES.GAME,
    game_start_time: startTime,
    game_paused: false,
    game_started: true,
    game_stopped: false,
    game_finished: false,
    script_locked: false,
    narration: [],
  }
}

const areAllPlayersReady = (players) => Object.values(players).every(player => player.ready)

const broadcastError = (room_id, message) => {
  broadcast(room_id, { type: 'ERROR', message })
}

const resetPlayerReadiness = (players) => {
  Object.keys(players).forEach(playerToken => {
    players[playerToken].ready = false
  })
}

export const startGame = async (ws, message) => {
  const { room_id, token } = message
  logTrace(`Attempting to start game in room: ${room_id}`)

  try {
  
    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

    if (!roomIdValid) {
      logError(`Room validation failed for room: ${room_id}`)
      return ws.send(JSON.stringify({ type: REDIRECT, path: '/lobby', errors }))
    }

  
    let newGamestate = initializeGameState(gamestate)
    const { players } = newGamestate

  
    if (!areAllPlayersReady(players)) {
      logError(`Not all players are ready. Current readiness: ${JSON.stringify(players)}`)
      return broadcastError(room_id, 'All players must be ready to start the game.')
    }

  
    newGamestate = startScene(newGamestate)

  
    resetPlayerReadiness(players)

  
    await upsertRoomState(newGamestate)
    logTrace(`Game started successfully in room [${room_id}] by player [${token}]`)

  
    return broadcast(room_id, { type: REDIRECT, path: `/game/${room_id}` })

  } catch (error) {
  
    logError(`Error starting game in room [${room_id}]: ${error.message}`)
    logError(JSON.stringify(error.stack))
    ws.send(
      JSON.stringify({
        type: 'ERROR',
        message: 'Game start failed. Please try again.',
      })
    )
  }
}
