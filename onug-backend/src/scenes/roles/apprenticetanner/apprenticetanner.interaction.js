import { formatPlayerIdentifier, generateRoleInteraction, getPlayerNumberWithMatchingToken } from '../../sceneUtils'
import { getTannerPlayerNumbersByRoleIds } from './apprenticetanner.utils'

export const apprenticetannerInteraction = (gamestate, token, title) => {
  let tanner = getTannerPlayerNumbersByRoleIds(gamestate.players)

  const messageIdentifiers = formatPlayerIdentifier(tanner)
  let privateMessage = ['interaction_tanner', ...messageIdentifiers]

  if (tanner.length > 0) {
    gamestate.players[token].card.player_team = 'apprenticetanner'
  } else if (tanner.length === 0) {
    tanner = [getPlayerNumberWithMatchingToken(gamestate.players, token)]
    gamestate.players[token].card.player_team = 'tanner'
    gamestate.players[token].card.player_role = 'TANNER'
    privateMessage = ['interaction_tanner_now']
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    tanner,
    scene_end: true
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: privateMessage,
    uniqueInformations: { tanner },
    scene_end: true
  })
}
