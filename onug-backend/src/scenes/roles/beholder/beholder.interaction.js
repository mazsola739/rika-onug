import { formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'
import { getAnySeerPlayerNumbersByRoleIds } from './beholder.utils'

export const beholderInteraction = (gamestate, token, title) => {
  const seers = getAnySeerPlayerNumbersByRoleIds(gamestate.players)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    seers,
    obligatory: false
  }

  const messageIdentifiers = formatPlayerIdentifier(seers)

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_seers', ...messageIdentifiers, 'interaction_may_look'],
    uniqueInformations: { seers, answer_options: ['yes', 'no'] },
    obligatory: false
  })
}
