import { ERROR, REDIRECT, STAGES } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { areAllPlayersReady, resetPlayerReadiness } from '../utils'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

export const startGame = async (ws, message) => {
  const { room_id, token } = message
  logTrace(`Attempting to start game in room: ${room_id}`)

  try {
    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

    if (!roomIdValid) {
      logError(`Room validation failed for room: ${room_id}`)
      return ws.send(JSON.stringify({ type: REDIRECT, path: '/lobby', errors }))
    }

    const startTime = Date.now()
    let newGamestate = {
      ...gamestate,
      stage: STAGES.GAME,
      game_start_time: startTime,
      game_started: true,
      game_stopped: false,
      game_finished: false,
      script_locked: false,
      actual_scenes: [
        {
          scene_title: 'START_GAME',
          scene_number: 0
        }
      ],
      narration: []
    }

    const { players } = newGamestate

    if (!areAllPlayersReady(players)) {
      logError(`Not all players are ready. Current readiness: ${JSON.stringify(players)}`)

      return broadcast(room_id, { type: ERROR, message: 'All players must be ready to start the game.' })
    }

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
        message: 'Game start failed. Please try again.'
      })
    )
  }
}
