import { ROOM_NAMES } from '../constants'
import { logWarn } from '../log'
import { readGamestate } from '../repository'
import { readRoomData_ } from '../repository/local_new.repository'

export const validateRoom = async roomId => {
  const errors = []

  const roomIdExists = ROOM_NAMES.includes(roomId)
  if (!roomIdExists) {
    errors.push('Invalid room id')
    return [false, {}, errors]
  }

  let gamestate

  try {
    gamestate = await readGamestate(roomId)

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
    logWarn(`Error reading gamestate for roomId ${roomId}: ${error.message}`)
    errors.push('An error occurred while retrieving the room data')
  }

  const validity = errors.length === 0
  if (!validity) logWarn(`Validation errors: ${errors}`)

  return [validity, gamestate || {}, errors]
}

export const validateRoom_ = async roomId => {
  const errors = []

  const roomIdExists = ROOM_NAMES.includes(roomId)
  if (!roomIdExists) {
    errors.push('Invalid room id')
    return [false, {}, errors]
  }

  let config, players

  try {
    // TODO handle here all small pieces of gamestate??
    config = readRoomData_(roomId, 'config')
    if (!config || config.room_id !== roomId) {
      errors.push('Room configuration is missing or invalid')
    }

    players = readRoomData_(roomId, 'players')
    if (!players || (players.players.lenght || players.total_players) >= 12 ) {
      errors.push('Room is already full')
    }
  } catch (error) {
    logWarn(`Error validating room ${roomId}: ${error.message}`)
    errors.push('An error occurred while validating the room')
  }

  const validity = errors.length === 0
  if (!validity) logWarn(`Validation errors: ${errors}`)

  return [validity, config, players, errors]
}
