import { generateRoleAction } from '../../sceneUtils'

//TODO break from here, if they dont want to play with this settings

export const epicbattleAction = (gamestate, token, title) => {
  return generateRoleAction(gamestate, token, title, {
    private_message: ['really_want'],
    scene_end: true
  })
}
