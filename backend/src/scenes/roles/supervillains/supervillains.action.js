import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const supervillainsAction = (gamestate, token, title) => {
  const villains = getPlayerNumbersByGivenConditions(gamestate.players, 'villain')
  const evilometer = getPlayerNumbersByGivenConditions(gamestate.players, 'evilometer')

  const messageIdentifiers = formatPlayerIdentifier(villains)

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_villains', ...messageIdentifiers, 'POINT'],
    uniqueInformation: { villains, evilometer }
  })
}
