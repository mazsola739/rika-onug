import { generateRoleAction } from '../../sceneUtils'
//TODO
export const openeyesAction = (gamestate, token, title) => {
  return generateRoleAction(gamestate, token, title, {
    private_message: [''],
    scene_end: true
  })
}
