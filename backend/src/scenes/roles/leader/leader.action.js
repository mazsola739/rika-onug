import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const leaderAction = (gamestate, token, title) => {
  const aliens = getPlayerNumbersByGivenConditions(gamestate.players, 'alien')
  const messageIdentifiers = formatPlayerIdentifier(aliens)

  return generateRoleAction(gamestate, token, title, {
    private_message: aliens.length > 0 ? ['action_aliens', ...messageIdentifiers, 'POINT'] : ['action_no_aliens'],
    uniqueInformation: { aliens },
    scene_end: true
  })
}
