import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const leaderZerbgroobAction = (gamestate, token, title) => {
  const zerbPlayers = getPlayerNumbersByGivenConditions(gamestate.players, 'zerb')
  const groobPlayers = getPlayerNumbersByGivenConditions(gamestate.players, 'groob')

  if (groobPlayers.length >= 1 && zerbPlayers.length >= 1) {
    const zerbgroob = zerbPlayers.concat(groobPlayers)

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      groobzerb: zerbgroob,
      scene_end: true
    }

    const messageIdentifiers = formatPlayerIdentifier(zerbgroob)

    return generateRoleAction(gamestate, token, {
      private_message: ['action_zerbgroob', ...messageIdentifiers],
      uniqueInformation: { groobzerb: zerbgroob },
      scene_end: true
    })
  } else {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      scene_end: true
    }

    return generateRoleAction(gamestate, token, {
      private_message: ['action_no_zerbgroob'],
      scene_end: true
    })
  }
}
