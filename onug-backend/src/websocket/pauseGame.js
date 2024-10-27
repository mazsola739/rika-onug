import { PAUSE_GAME } from '../constants'
import { logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { pauseScene } from '../scenes'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

export const pauseGame = async (message) => {
  const { room_id, token } = message
  logTrace(`Toggling game pause in room: ${room_id} by player: ${token}`)

  const [roomIdValid, gamestate, errors] = await validateRoom(room_id)
  if (!roomIdValid) return broadcast(room_id, { type: PAUSE_GAME, errors })

  const newGamestate = pauseScene(gamestate)
  await upsertRoomState(newGamestate)

  broadcast(room_id, { type: PAUSE_GAME, success: true, message: 'pause toggled' })
}
