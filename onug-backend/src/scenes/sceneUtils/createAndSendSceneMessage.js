import { SCENE } from '../../constants'
import { sendMessage } from '../../utils'

export const createAndSendSceneMessage = (ws, gamestate, token, title, action, narration = []) => {
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
    players: Object.values(gamestate.players).map(player => ({ //TODO save into gamestate?
      player_number: player.player_number,
      player_name: player.name,
      flag: player.flag
    }))
  }

  sendMessage(ws, message)
}
