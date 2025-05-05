import { ERROR, REDIRECT, STAGES } from '../../constants'
import { logError, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { areAllPlayersReady, resetPlayerReadiness } from '../../utils'
import { validateRoom } from '../../validators'
import { broadcast, sendMessage } from '../../utils/connections.utils'

//TODO dont allow if less then 3 players in game?

export const startGame = async (ws, message) => {
  const { room_id, token } = message
  logTrace(`Attempting to start game in room: ${room_id}`)

  try {
    const [validity, gamestate, errors] = await validateRoom(room_id)

    if (!validity) return sendMessage(ws, { type: REDIRECT, path: '/lobby', errors })

    const startTime = Date.now()

    let newGamestate = {
      ...gamestate,
      stage: STAGES.GAME,
      game_start_time: startTime,
      game_started: true,
      game_stopped: false,
      game_finished: false,
      scenes: {
        chapter: [
          {
            scene_title: 'START_GAME',
            scene_number: 0
          }
        ],
        narration: []
      }
    }

    if (!areAllPlayersReady(newGamestate.players)) {
      logError(`Not all players are ready. Current readiness: ${JSON.stringify(newGamestate)}`)

      return broadcast(room_id, { type: ERROR, message: 'All players must be ready to start the game.' })
    }

    resetPlayerReadiness(newGamestate.players)

    await repo[repositoryType].upsertRoomState(newGamestate)
    logTrace(`Game started successfully in room [${room_id}] by player [${token}]`)

    return broadcast(room_id, { type: REDIRECT, path: `/game/${room_id}` })
  } catch (error) {
    logError(`Error starting game in room [${room_id}]: ${error.message}`)
    logError(JSON.stringify(error.stack))
    sendMessage(ws, { type: 'ERROR', message: 'Game start failed. Please try again.' })
  }
}
