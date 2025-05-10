import { generateRoleAction } from '../../sceneUtils'

export const jokeAction = (gamestate, token, title) => {
  return generateRoleAction(gamestate, token, title, {
    private_message: ['the_end'],
    scene_end: true
  })
}
