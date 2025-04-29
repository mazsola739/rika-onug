import { ROOM_NAMES } from '../constants'
import { logWarn } from '../log'
import { readGamestate, readGamestate_ } from '../repository'

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
    return { validity: false, errors }
  }

  let roomState, players, table, scene, roles

  try {
    roomState = await readGamestate_(roomId, 'roomState')
    if (!roomState || roomState.room_id !== roomId) {
      errors.push('Room state is missing or invalid')
    }

    players = await readGamestate_(roomId, 'players')
    if (!players || (players.players.lenght || players.total_players) >= 12) {
      errors.push('Room is already full')
    }

    table = await readGamestate_(roomId, 'table')
    if (!table) {
      errors.push('Room table is missing or invalid')
    }

    scene = await readGamestate_(roomId, 'scene')
    if (!scene) {
      errors.push('Room scene is missing or invalid')
    }

    roles = await readGamestate_(roomId, 'roles')
    if (!roles) {
      errors.push('Room roles is missing or invalid')
    }
  } catch (error) {
    logWarn(`Error validating room ${roomId}: ${error.message}`)
    errors.push('An error occurred while validating the room')
  }

  const validity = errors.length === 0
  if (!validity) logWarn(`Validation errors: ${errors}`)

  return { validity, roomState, players, table, scene, errors }
}
