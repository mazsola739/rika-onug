import { ROOM_NAMES } from '../constants'
import { logWarn } from '../log'
import { repo, repositoryType } from '../repository'

export const validateRoom = async room_id => {
  const errors = []

  const roomIdExists = ROOM_NAMES.includes(room_id)
  if (!roomIdExists) {
    errors.push('Invalid room id')
    return [false, {}, errors]
  }

  let gamestate

  try {
    gamestate = await repo[repositoryType].readGamestate(room_id)
    if (!gamestate) {
      errors.push('Room does not exist')
    } else {
      if (gamestate.closed) {
        errors.push('Gamestate is already closed for that room id')
      }

      if (Object.keys(gamestate.players || {}).length >= 12) {
        errors.push('Room is already full')
      }
    }
  } catch (error) {
    logWarn(`Error reading gamestate for room_id ${room_id}: ${error.message}`)
    errors.push('An error occurred while retrieving the room data')
  }

  const validity = errors.length === 0
  if (!validity) logWarn(`Validation errors: ${errors}`)

  return [validity, gamestate || {}, errors]
}
