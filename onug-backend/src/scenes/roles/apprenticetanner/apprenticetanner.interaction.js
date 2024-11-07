import { formatPlayerIdentifier, generateRoleInteraction, getPlayerNumberWithMatchingToken } from '../../sceneUtils'
import { getTannerPlayerNumbersByRoleIds } from './apprenticetanner.utils'

export const apprenticetannerInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  let tanner = getTannerPlayerNumbersByRoleIds(newGamestate.players)

  const messageIdentifiers = formatPlayerIdentifier(tanner)
  let privateMessage = ['interaction_tanner', ...messageIdentifiers]

  if (tanner.length > 0) {
    newGamestate.players[token].card.player_team = 'apprenticetanner'
  } else if (tanner.length === 0) {
    tanner = [getPlayerNumberWithMatchingToken(gamestate.players, token)]
    newGamestate.players[token].card.player_team = 'tanner'
    newGamestate.players[token].card.player_role = 'TANNER'
    privateMessage = ['interaction_tanner_now']
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    tanner,
    scene_end: true
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: privateMessage,
    uniqueInformations: { tanner },
    scene_end: true
  })
}
