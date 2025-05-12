import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const loversAction = (gamestate, token, title) => {
  const lovers = getPlayerNumbersByGivenConditions(gamestate, 'lover')

  const messageIdentifiers = formatPlayerIdentifier(lovers)

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_mark_of_lover', ...messageIdentifiers, 'POINT'],
    uniqueInformation: { lovers },
    scene_end: true
  })
}
