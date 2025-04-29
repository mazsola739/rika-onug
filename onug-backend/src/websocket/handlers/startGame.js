import { ERROR, REDIRECT, STAGES } from '../../constants'
import { logError, logTrace } from '../../log'
import { upsertRoomState_ } from '../../repository'
import { areAllPlayersReady, resetPlayerReadiness } from '../../utils'
import { validateRoom_ } from '../../validators'
import { broadcast } from '../../utils/connections.utils'

export const startGame = async (ws, message) => {
  const { room_id, token } = message
  logTrace(`Attempting to start game in room: ${room_id}`)

  try {
    const { validity, roomState, players, scene, errors } = await validateRoom_(room_id)

    if (!validity) return ws.send(JSON.stringify({ type: REDIRECT, path: '/lobby', errors }))

    const startTime = Date.now()
    let newState = {
      ...roomState,
      stage: STAGES.GAME,
      game_start_time: startTime,
      game_started: true,
      game_stopped: false,
      game_finished: false,
    }

    let newScene = {
      ...scene,
      script_locked: false,
      chapter: [
        {
          scene_title: 'START_GAME',
          scene_number: 0
        }
      ],
      narration: []
    }

    if (!areAllPlayersReady(players.players)) {
      logError(`Not all players are ready. Current readiness: ${JSON.stringify(players)}`)

      return broadcast(room_id, { type: ERROR, message: 'All players must be ready to start the game.' })
    }

    resetPlayerReadiness(players)

    await upsertRoomState_(room_id, "roomState", newState)
    await upsertRoomState_(room_id, "scene", newScene)
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
