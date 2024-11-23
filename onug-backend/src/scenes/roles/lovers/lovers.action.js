import { formatPlayerIdentifier, generateRoleAction } from '../../sceneUtils'
import { getLoversPlayerNumbersByMark } from '../../sceneUtils/getLoversPlayerNumbersByMark'

export const loversAction = (gamestate, token, title) => {
  const lovers = getLoversPlayerNumbersByMark(gamestate.players)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    lovers,
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier(lovers)

  return generateRoleAction(gamestate, token, {
    private_message: ['action_mark_of_lover', ...messageIdentifiers],
    uniqueInformations: { lovers },
    scene_end: true
  })
}
