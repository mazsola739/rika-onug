const { validateRoom } = require('./room-validator')

exports.validatePlayer = async (room_id, player_name) => {
  const [isValidRoom, gameState] = await validateRoom(room_id)
  
  if (!isValidRoom) return [false, 'Invalid room']

  const isPlayerAlreadyInRoom = gameState?.players?.some(player => player.name === player_name)

  if (isPlayerAlreadyInRoom) return [false, 'Player is already in the room']

  return [true, 'Player can join']
}
