import { readGamestate } from '../repository'
import { logWarn } from '../log'
import { ROOM_NAMES } from '../constants'

export const validateRoom = async (roomId) => {
  const errors = []
  
  const roomIdExists = ROOM_NAMES.includes(roomId)
  if (!roomIdExists) {
    errors.push('Invalid room id')

    return [false, {}, errors]
  }

  const gamestate = await readGamestate(roomId)

  if (!gamestate) {
    errors.push('Room does not exist')
  }

  const closed = gamestate?.closed
  if (closed) {
    errors.push('gamestate is already closed for that room id')
  }

  const playersFull = gamestate?.players?.length === 12
  if (playersFull) {
    errors.push('Room is already full')
  }

  const validity = errors.length === 0
  if (!validity) logWarn(`Validation errors: ${errors}`)

  return [validity, gamestate, errors]
}
