import { HYDRATE_SCENE } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { responseHandler, sceneHandler, scriptHandler } from '../scenes'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

export const scene = async (ws, message) => {
  const { room_id, token, selected_card_positions, selected_mark_positions, selected_answer, player_ready } = message
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
      } else {
        logError(`Not all players are ready in room: ${room_id}. Current readiness: ${JSON.stringify(players)}`)
        broadcast(room_id, { type: 'ERROR', message: 'Waiting for all players to be ready.' })
      }

      await upsertRoomState(newGamestate)

    } else {
      logTrace(`Handling player actions in room: ${room_id}`)
      responseHandler(newGamestate, token, selected_card_positions, selected_mark_positions, selected_answer)

      await upsertRoomState(newGamestate)
    }

    newGamestate = await sceneHandler(newGamestate)

    const player = ws.token
    const publicPlayers = Object.values(players).map((player) => ({
      player_number: `player_${player.player_number}`,
      player_name: player.name,
      ready: player.ready,
    }))
    const publicPlayer = {
      player_name: players[token].name,
      player_number: `player_${players[token].player_number}`,
    }

    newGamestate.scene.map(scene => scene.token === player && ws.send(JSON.stringify({ ...scene,  player: publicPlayer, players: publicPlayers })))

    logTrace(`Scene interaction processed successfully for room: ${room_id}`)

  } catch (error) {
    logError(`Error processing scene interaction in room: ${room_id}. Error: ${error.message}`)
    logError(JSON.stringify(error.stack))
    broadcast(room_id, { type: 'ERROR', message: 'An error occurred. Please try again.' })
  }
}
