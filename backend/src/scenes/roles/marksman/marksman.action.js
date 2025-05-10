import { generateRoleAction } from '../../sceneUtils'

export const marksmanAction = (gamestate, token, title) => {
  const answer_options = ['cards', 'marks']

  //TODO if no marks only cards

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_must_one_any'],
    uniqueInformation: { answer_options },
    obligatory: true
  })
}
