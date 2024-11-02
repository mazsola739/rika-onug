import { HYDRATE_SCENE } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { responseHandler, sceneHandler, scriptHandler } from '../scenes'
import { validateRoom } from '../validators'

export const scene = async (ws, message) => {
  const { room_id, token, selected_card_positions, selected_mark_positions, selected_answer, player_ready, title, done, skip } = message
  logTrace(`Processing scene interaction in room: ${room_id}`)

  try {
    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

    if (!roomIdValid) {
      logError(`Room validation failed for room: ${room_id}`)
      return ws.send(JSON.stringify({ type: HYDRATE_SCENE, success: false, errors }))
    }

    let newGamestate = { ...gamestate }
    const { players } = newGamestate

    if (player_ready) {
      players[token].ready = true
      const allPlayersReady = Object.values(players).every(player => player.ready)

      if (allPlayersReady) {
        logTrace(`All players ready in room: ${room_id}. Proceeding with script handler.`)
        newGamestate = await scriptHandler(newGamestate)
        newGamestate = await sceneHandler(newGamestate)
      } else {
        logError(`Not all players are ready in room: ${room_id}. Current readiness: ${JSON.stringify(players)}`)
      }
    } else if(done) {
        players[token].player_history[title].finished = true
        newGamestate = await sceneHandler(newGamestate)
    } else if(skip) {
        players[token].player_history[title].skipped = true
        newGamestate = await sceneHandler(newGamestate)
    } else {
      logTrace(`Handling player actions in room: ${room_id}`)

      await responseHandler(newGamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title)
    }

    await upsertRoomState(newGamestate)

    logTrace(`Scene interaction processed successfully for room: ${room_id}`)

  } catch (error) {
    logError(`Error processing scene interaction in room: ${room_id}. Error: ${error.message}`)
    logError(JSON.stringify(error.stack))
  }
}
