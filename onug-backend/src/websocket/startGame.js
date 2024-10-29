import { REDIRECT, STAGES } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { startScene } from '../scenes'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

// TODO: Implement random delay to confuse players regarding first role play
export const startGame = async (ws, message) => {
  const { room_id, token } = message
  logTrace(`Attempting to start game in room: ${room_id}`)

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
    game_paused: false,
    game_started: true,
    game_stopped: false,
    game_finished: false,
    script_locked: true,
    narration: [],
    scene: [],
  }

  const { players } = newGamestate
  const allPlayersReady = Object.values(players).every((player) => player.ready)

  if (!allPlayersReady) {
    logError(
      `Not all players are ready. Current readiness: ${JSON.stringify(players)}`
    )

    return broadcast(room_id, {
      type: 'ERROR',
      message: 'All players must be ready to start the game.',
    })
  }

  newGamestate = startScene(newGamestate)

  try {
    logTrace(
      `Game started successfully in room [${room_id}] by player [${token}]`
    )

    await upsertRoomState(newGamestate)

    return broadcast(room_id, { type: REDIRECT, path: `/game/${room_id}` })
  } catch (error) {
    logError(
      `Error saving initial game state for room [${room_id}]: ${error.message}`
    )

    ws.send(
      JSON.stringify({
        type: 'ERROR',
        message: 'Game start failed. Please try again.',
      })
    )
  }

  return newGamestate
}
