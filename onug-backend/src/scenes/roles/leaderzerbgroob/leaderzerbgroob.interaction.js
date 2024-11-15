import { formatPlayerIdentifier, generateRoleInteraction, getGroobPlayerNumberByRoleIds, getZerbPlayerNumberByRoleIds } from '../../sceneUtils'

export const leaderZerbgroobInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const zerb = getZerbPlayerNumberByRoleIds(newGamestate.players)
  const groob = getGroobPlayerNumberByRoleIds(newGamestate.players)

  //TODO leader team

  if (groob.length >= 1 && zerb.length >= 1) {
    const zerbgroob = zerb.concat(groob)

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      groobzerb: zerbgroob,
      scene_end: true
    }

    const messageIdentifiers = formatPlayerIdentifier(zerbgroob)

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_zerbgroob', ...messageIdentifiers],
      scene_end: true
    })
  } else {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      scene_end: true
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_no_zerbgroob'],
      scene_end: true
    })
  }
}
