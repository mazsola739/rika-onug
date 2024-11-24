import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const supervillainsAction = (gamestate, token, title) => {
  const villains = getPlayerNumbersByGivenConditions(gamestate.players, 'villain')

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    villains
  }

  const messageIdentifiers = formatPlayerIdentifier(villains)

  return generateRoleAction(gamestate, token, {
    private_message: ['action_villains', ...messageIdentifiers],
    uniqueInformations: { villains }
  })
}
