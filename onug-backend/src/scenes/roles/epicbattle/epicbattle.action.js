import { generateRoleAction } from '../../sceneUtils'

export const epicbattleAction = (gamestate, token, title) => {
  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    scene_end: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['really_want'],
    scene_end: true
  })
}
