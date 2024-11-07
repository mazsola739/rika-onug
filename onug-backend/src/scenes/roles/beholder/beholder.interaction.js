import { formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'
import { getAnySeerPlayerNumbersByRoleIds } from './beholder.utils'

export const beholderInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const seers = getAnySeerPlayerNumbersByRoleIds(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    seers,
    obligatory: false
  }

  const messageIdentifiers = formatPlayerIdentifier(seers)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_seers', ...messageIdentifiers, 'interaction_may_look'],
    uniqueInformations: { seers, answer_options: ['yes', 'no'] },
    obligatory: false
  })
}
