import { HYDRATE_SCENE, REDIRECT } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { responseHandler, sceneHandler, scriptHandler } from '../scenes'
import { allPlayersStateCheck } from '../utils'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

export const scene = async (ws, message) => {
  const { room_id, token, selected_card_positions, selected_mark_positions, selected_answer, night_ready, day_ready, title, done, skip } = message
  logTrace(`Processing scene interaction in room: ${room_id}`)

  try {
    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

    if (!roomIdValid) {
      logError(`Room validation failed for room: ${room_id}`)
      return ws.send(JSON.stringify({ type: HYDRATE_SCENE, success: false, errors }))
    }

    let newGamestate = { ...gamestate }
    const { players } = newGamestate

    if (day_ready) {
      players[token].ready = true
      if (allPlayersStateCheck(players, 'ready')) {
        logTrace(`All players has sun rise in room, game finished succesfully: ${room_id}. Redirecting to Vote.`)

        await upsertRoomState(newGamestate)

        broadcast(room_id, { type: REDIRECT, path: `/vote/${room_id}` })

        Object.keys(players).forEach(playerToken => {
          players[playerToken].ready = false
        })
      }
    } else if (night_ready) {
      players[token].ready = true
      if (allPlayersStateCheck(players, 'ready')) {
        logTrace(`All players has nigh fall in room: ${room_id}. Proceeding with script and scene handlers.`)
        newGamestate = await scriptHandler(newGamestate)
        newGamestate = await sceneHandler(newGamestate)

        Object.keys(players).forEach(playerToken => {
          players[playerToken].ready = false
        })
      } else {
        logTrace(`Waiting for all players to be ready in room: ${room_id}.`)
      }
    } else if (done || skip) {
      players[token].player_history[title][done ? 'finished' : 'skipped'] = true
      players[token].action_finished = true
      
      if (allPlayersStateCheck(players, 'action_finished')) {
        newGamestate = await sceneHandler(newGamestate)
      } else {
        logTrace(`Waiting for all players to be finished actions in room: ${room_id}.`)
      }

    } else {
      logTrace(`Handling specific player actions in room: ${room_id}`)
      await responseHandler(newGamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title)
    }

    await upsertRoomState(newGamestate)
    logTrace(`Scene interaction processed successfully for room: ${room_id}`)

  } catch (error) {
    logError(`Error processing scene interaction in room: ${room_id}. Error: ${error.message}`)
    logError(JSON.stringify(error.stack))
  }
}
