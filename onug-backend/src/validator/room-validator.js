import { readGameState } from '../repository';
import { logWarn } from '../log';

const roomIds = ['foyer', 'archives', 'armory', 'dynamite_room', 'great_hall', 'guest_bedroom', 'kitchen', 'laboratory', 
'observatory', 'panic_room', 'parlor', 'secret_passage', 'sitting_room', 'staff_quarters', 'study', 'workshop']

export const validateRoom = async (roomId) => {
  const errors = []
  
  const roomIdExists = roomIds.includes(roomId)
  if (!roomIdExists) {
    errors.push('Invalid room id')

    return [false, {}, errors]
  }

  const gameState = await readGameState(roomId)

  if (!gameState) {
    errors.push('Room does not exist')
  }

  const closed = gameState?.closed
  if (closed) {
    errors.push('Gamestate is already closed for that room id')
  }

  const playersFull = gameState?.players?.length === 12
  if (playersFull) {
    errors.push('Room is already full')
  }

  const validity = errors.length === 0
  if (!validity) logWarn(`Validation errors: ${errors}`)

  return [validity, gameState, errors]
};
