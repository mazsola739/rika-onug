import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const leaderZerbgroobAction = (gamestate, token, title) => {
  const zerbPlayers = getPlayerNumbersByGivenConditions(gamestate.players, 'zerb')
  const groobPlayers = getPlayerNumbersByGivenConditions(gamestate.players, 'groob')

  if (groobPlayers.length >= 1 && zerbPlayers.length >= 1) {
    const zerbgroob = zerbPlayers.concat(groobPlayers)
    const messageIdentifiers = formatPlayerIdentifier(zerbgroob)

    return generateRoleAction(gamestate, token, title, {
      private_message: ['action_zerbgroob', ...messageIdentifiers, 'POINT'],
      uniqueInformation: { groobzerb: zerbgroob },
      scene_end: true
    })
  } else {
    return generateRoleAction(gamestate, token, title, {
      private_message: ['action_no_zerbgroob'],
      scene_end: true
    })
  }
}
