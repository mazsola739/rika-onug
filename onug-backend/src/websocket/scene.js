import { HYDRATE_SCENE, REDIRECT } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { responseHandler, chapterHandler, scriptHandler } from '../scenes'
import { rippleHandler } from '../scenes/rippleHandler'
import { allPlayersStateCheck /* randomDelay */ } from '../utils'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

const setPlayerReady = (players, token) => {
  players[token].flag = true
}

const resetPlayerReadiness = players => {
  Object.keys(players).forEach(playerToken => {
    players[playerToken].flag = false
  })
}

const handleNightReady = async (room_id, gamestate, players, token) => {
  setPlayerReady(players, token)
  if (allPlayersStateCheck(players, 'flag')) {
    logTrace(`All players are ready for night in room: ${room_id}. Processing script and scene handlers.`)

    Object.keys(players).forEach(playerToken => {
      players[playerToken].action_finished = true
    })

    //TODO uncomment delay
    /* await randomDelay() */

    gamestate = await scriptHandler(gamestate)
    if (gamestate.scripts[gamestate.scripts.length - 1].scene_title === 'RIPPLE') {
      gamestate = await rippleHandler(gamestate)
    }
    gamestate = await chapterHandler(gamestate)
    resetPlayerReadiness(players)
  } else {
    logTrace(`Waiting for all players to be ready for night in room: ${room_id}.`)
  }
  return gamestate
}

const handleDayReady = async (room_id, newGamestate, players, token) => {
  setPlayerReady(players, token)
  if (allPlayersStateCheck(players, 'flag')) {
    logTrace(`All players are ready for day in room: ${room_id}. Redirecting to Vote.`)
    await upsertRoomState(newGamestate)
    broadcast(room_id, { type: REDIRECT, path: `/council/${room_id}` })
    resetPlayerReadiness(players)
  }
  return newGamestate
}

const handleDoneOrSkip = async (room_id, newGamestate, players, token, title, actionType) => {
  players[token].player_history[title][actionType] = true
  players[token].action_finished = true

  if (allPlayersStateCheck(players, 'action_finished')) {
    newGamestate = await chapterHandler(newGamestate)
  } else {
    logTrace(`Waiting for all players to finish actions in room: ${room_id}.`)
  }

  return newGamestate
}

const handleResponseAction = async (newGamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title) => {
  await responseHandler(newGamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title)
}

export const scene = async (ws, message) => {
  const { room_id, token, selected_card_positions, selected_mark_positions, selected_answer, night_ready, day_ready, title, done, skip } = message
  logTrace(`Processing scene action in room: ${room_id}`)

  try {
    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)
    if (!roomIdValid) {
      logError(`Room validation failed for room: ${room_id}`)
      return ws.send(JSON.stringify({ type: HYDRATE_SCENE, success: false, errors }))
    }

    let newGamestate = { ...gamestate }
    const { players } = newGamestate

    if (night_ready) {
      newGamestate = await handleNightReady(room_id, newGamestate, players, token)
    } else if (day_ready) {
      newGamestate = await handleDayReady(room_id, newGamestate, players, token)
    } else if (done) {
      newGamestate = await handleDoneOrSkip(room_id, newGamestate, players, token, title, 'finished')
    } else if (skip) {
      newGamestate = await handleDoneOrSkip(room_id, newGamestate, players, token, title, 'skipped')
    } else {
      logTrace(`Processing player response in room: ${room_id}`)
      await handleResponseAction(newGamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title)
    }

    await upsertRoomState(newGamestate)
    logTrace(`Scene action processed successfully for room: ${room_id}`)
  } catch (error) {
    logError(`Error processing scene action in room: ${room_id}. Error: ${error.message}`)
    logError(JSON.stringify(error.stack))
  }
}
