import { PAUSE_GAME } from '../constants'
import { logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { pauseGamePlay } from '../scenes/game-play'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

export const pauseGame = async (message) => {
  const { room_id, token } = message
  logTrace(`game pause requested in: ${room_id} by player: ${token}`)
  const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

  if (!roomIdValid) return broadcast({ type: PAUSE_GAME, errors })

  // TODO validate if player is admin and in the room
  
  let newGamestate = pauseGamePlay(gamestate)

  await upsertRoomState(newGamestate)

  const pauseGame = { type: PAUSE_GAME, actual_scene: newGamestate.actual_scene }
  
  return broadcast(room_id, pauseGame)
}
