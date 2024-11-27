import { generateRoleAction } from '../../sceneUtils'

export const rippleAction = (gamestate, token, title) => {
  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    scene_end: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['ripple_start'],
    scene_end: true
  })
}
