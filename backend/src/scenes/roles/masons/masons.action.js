import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const masonsAction = (gamestate, token, title) => {
  const masons = getPlayerNumbersByGivenConditions(gamestate.players, 'mason')

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_masons'],
    uniqueInformation: { masons },
    scene_end: true
  })
}
