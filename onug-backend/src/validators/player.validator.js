import { logWarn } from '../log'
import { validateRoom } from './room.validator'

export const validatePlayer = async (room_id, player_name) => {
  try {
    const [isValidRoom, gamestate] = await validateRoom(room_id)

    if (!isValidRoom) return [false, 'Invalid room']

    const isPlayerAlreadyInRoom = gamestate?.players?.some(player => player.name === player_name)

    if (isPlayerAlreadyInRoom) return [false, 'Player is already in the room']

    return [true, 'Player can join']
  } catch (error) {
    logWarn(`Error in validatePlayer: ${error.message}`)
    return [false, 'An unexpected error occurred. Please try again.']
  }
}
