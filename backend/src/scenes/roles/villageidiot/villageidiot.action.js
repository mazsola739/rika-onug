import { generateRoleAction } from '../../sceneUtils'

export const villageidiotAction = (gamestate, token, title) => {
  const answer_options = ['left', 'right']

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_may_direction'],
    uniqueInformation: { answer_options }
  })
}
