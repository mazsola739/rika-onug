import { generateRoleAction } from '../../sceneUtils'

export const jokeAction = (gamestate, token, title) => {
  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    scene_end: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['the_end'],
    scene_end: true
  })
}
