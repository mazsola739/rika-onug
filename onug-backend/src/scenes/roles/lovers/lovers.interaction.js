import { formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'
import { getLoversPlayerNumbersByMark } from './lovers.utils'

export const loversInteraction = (gamestate, token, title) => {
  const lovers = getLoversPlayerNumbersByMark(gamestate.players)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    lovers,
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier(lovers)

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_mark_of_lover', ...messageIdentifiers],
    uniqueInformations: { lovers },
    scene_end: true
  })
}
