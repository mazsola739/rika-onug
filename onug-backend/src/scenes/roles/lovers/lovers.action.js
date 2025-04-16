import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const loversAction = (gamestate, token, title) => {
  const lovers = getPlayerNumbersByGivenConditions(gamestate.players, 'lover')

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    lovers,
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier(lovers)

  return generateRoleAction(gamestate, token, {
    private_message: ['action_mark_of_lover', ...messageIdentifiers, 'POINT'],
    uniqueInformation: { lovers },
    scene_end: true
  })
}
