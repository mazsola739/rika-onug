import { REDIRECT } from '../constant/ws';
import { logTrace } from '../log';
import { validateRoom } from '../validator';
import { repository } from '../repository';
import { broadcast } from './connections';
import { stopGamePlay } from '../screen-play';
const { upsertRoomState } = repository

export const stopGame = async (message) => {
  const { room_id, token } = message
  logTrace(`game stop requested in: ${room_id}`)
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid) return broadcast({ type: REDIRECT, path: '/lobby', errors })

  // TODO validate if player is admin and in the room
  
  let newGameState = stopGamePlay(gameState)

  logTrace(`Game stopped by player [${token}], in room [${room_id}]`)

  await upsertRoomState(newGameState)

  const stopGame = {
    type: REDIRECT,
    path: `/room/${room_id}`
  }
  
  return broadcast(room_id, stopGame)
};
