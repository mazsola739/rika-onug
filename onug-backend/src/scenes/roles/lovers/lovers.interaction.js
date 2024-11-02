import { formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'
import { getLoversPlayerNumbersByMark } from './lovers.utils'

export const loversInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const lovers = getLoversPlayerNumbersByMark(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    lovers,
    scene_end: true,
  }

  const messageIdentifiers = formatPlayerIdentifier(lovers)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_lover', ...messageIdentifiers],
    uniqueInformations: { lovers },
    scene_end: true,
  })
}
