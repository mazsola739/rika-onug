import { formatPlayerIdentifier, generateRoleInteraction, getGroobPlayerNumberByRoleIds, getZerbPlayerNumberByRoleIds } from '../../sceneUtils'

export const leaderZerbgroobInteraction = (gamestate, token, title) => {
  const zerb = getZerbPlayerNumberByRoleIds(gamestate.players)
  const groob = getGroobPlayerNumberByRoleIds(gamestate.players)

  //TODO leader team

  if (groob.length >= 1 && zerb.length >= 1) {
    const zerbgroob = zerb.concat(groob)

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      groobzerb: zerbgroob,
      scene_end: true
    }

    const messageIdentifiers = formatPlayerIdentifier(zerbgroob)

    return generateRoleInteraction(gamestate, token, {
      private_message: ['interaction_zerbgroob', ...messageIdentifiers],
      scene_end: true
    })
  } else {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      scene_end: true
    }

    return generateRoleInteraction(gamestate, token, {
      private_message: ['interaction_no_zerbgroob'],
      scene_end: true
    })
  }
}
