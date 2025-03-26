import { SCENE } from '../../constants'
import { sendMessageToPlayer } from '../../utils'

export const createAndSendSceneMessage = (gamestate, token, title, action, narration = []) => {
  if (Object.keys(action).length === 0) return

  const player = gamestate.players[token]

  const message = {
    type: SCENE,
    success: true,
    title,
    token,
    action,
    narration,
    player: {
      player_name: player.name,
      player_number: player.player_number
    },
    players: Object.values(gamestate.players).map(player => ({
      player_number: player.player_number,
      player_name: player.name,
      flag: player.flag
    }))
  }

  sendMessageToPlayer(gamestate.room_id, token, message)
}
