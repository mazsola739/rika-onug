import { formatPlayerIdentifier, generateRoleInteraction, getVillainPlayerNumbersByRoleIds } from '../../sceneUtils'

export const supervillainsInteraction = (gamestate, token, title) => {
  const villains = getVillainPlayerNumbersByRoleIds(gamestate.players)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    villains
  }

  const messageIdentifiers = formatPlayerIdentifier(villains)

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_villains', ...messageIdentifiers],
    uniqueInformations: { villains }
  })
}
