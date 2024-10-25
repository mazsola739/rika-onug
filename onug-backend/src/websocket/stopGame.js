import { REDIRECT } from '../constants'
import { logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { stopScene } from '../scenes/stopScene'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

export const stopGame = async (message) => {
  const { room_id, token } = message
  logTrace(`Stopping game in room: ${room_id}`);
  const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

  if (!roomIdValid) return broadcast({ type: REDIRECT, path: '/lobby', errors })

  // TODO validate if player is admin and in the room
  
  let newGamestate = stopScene(gamestate)

  logTrace(`Game stopped by player [${token}], in room [${room_id}]`)

  await upsertRoomState(newGamestate)

  broadcast(room_id, { type: REDIRECT, path: `/room/${room_id}` })
}
