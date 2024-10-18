import { getZerbPlayerNumberByRoleIds, getGroobPlayerNumberByRoleIds, formatPlayerIdentifier, generateRoleInteraction } from "../../sceneUtils"

export const leaderZerbgroobInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const zerb = getZerbPlayerNumberByRoleIds(newGamestate.players)
  const groob = getGroobPlayerNumberByRoleIds(newGamestate.players)

  if (groob.length >= 1 && zerb.length >= 1) {
    const zerbgroob = zerb.concat(groob)

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      groobzerb: zerbgroob,
    }

    const messageIdentifiers = formatPlayerIdentifier(zerbgroob)

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_zerbgroob', ...messageIdentifiers],
      uniqueInformations: { groobzerb: zerbgroob },
    })
  } else {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_no_zerbgroob'],
    })
  }
}
