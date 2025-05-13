import { generateRoleAction } from '../../sceneUtils'

//TODO better message
export const nostradamusreactionAction = (gamestate, token, title) => {
  return generateRoleAction(gamestate, token, title, {
    private_message: ['FYI_TBD'],
    scene_end: true
  })
}
