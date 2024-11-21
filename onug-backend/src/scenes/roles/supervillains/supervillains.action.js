import { formatPlayerIdentifier, generateRoleAction, getVillainPlayerNumbersByRoleIds } from '../../sceneUtils'

export const supervillainsInteraction = (gamestate, token, title) => {
  const villains = getVillainPlayerNumbersByRoleIds(gamestate.players)

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
