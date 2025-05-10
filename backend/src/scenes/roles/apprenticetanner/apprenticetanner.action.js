import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const apprenticetannerAction = (gamestate, token, title) => {
  let tanner = getPlayerNumbersByGivenConditions(gamestate.players, 'tanner')

  const messageIdentifiers = formatPlayerIdentifier(tanner)
  let privateMessage = ['action_tanner', ...messageIdentifiers, 'POINT']

  if (tanner.length > 0) {
    gamestate.players[token].card.player_team = 'apprenticetanner'
  } else if (tanner.length === 0) {
    tanner = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)
    gamestate.players[token].card.player_team = 'tanner'
    gamestate.players[token].card.player_role = 'TANNER'
    privateMessage = ['action_tanner_now']
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    tanner,
    scene_end: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: privateMessage,
    uniqueInformation: { tanner },
    scene_end: true
  })
}
