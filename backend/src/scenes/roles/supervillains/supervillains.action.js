import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const supervillainsAction = (gamestate, token, title) => {
  const villains = getPlayerNumbersByGivenConditions(gamestate, 'villain')
  const evilometer = getPlayerNumbersByGivenConditions(gamestate, 'evilometer')

  const messageIdentifiers = formatPlayerIdentifier(villains)

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_villains', ...messageIdentifiers, 'POINT'],
    uniqueInformation: { villains, evilometer }
  })
}
