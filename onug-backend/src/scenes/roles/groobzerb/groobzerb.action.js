import { formatPlayerIdentifier, generateRoleAction, getGroobPlayerNumberByRoleIds, getZerbPlayerNumberByRoleIds } from '../../sceneUtils'

export const groobzerbAction = (gamestate, token, title) => {
  const player = gamestate.players[token]

  const zerbPlayers = getZerbPlayerNumberByRoleIds(gamestate.players)
  const groobPlayers = getGroobPlayerNumberByRoleIds(gamestate.players)

  if (player.player_role_id === 47) {
    if (zerbPlayers.length >= 1) {
      gamestate.players[token].card.player_team = 'groob'
      groobPlayers.forEach(groob => (gamestate.card_positions[groob].team = 'groob'))

      player.player_history[title] = {
        ...player.player_history[title],
        zerb: zerbPlayers
      }

      const messageIdentifiers = formatPlayerIdentifier(zerbPlayers)

      return generateRoleAction(gamestate, token, {
        private_message: ['action_zerbgroob', ...messageIdentifiers],
        uniqueInformations: { groobzerb: zerbPlayers }
      })
    } else {
      player.player_history = { ...player.player_history, scene_title: title }

      return generateRoleAction(gamestate, token, {
        private_message: ['action_no_zerb']
      })
    }
  } else if (player.player_role_id === 54) {
    if (groobPlayers.length >= 1) {
      gamestate.players[token].card.player_team = 'zerb'
      zerbPlayers.forEach(zerb => (gamestate.card_positions[zerb].team = 'zerb'))

      player.player_history[title] = {
        ...player.player_history[title],
        groob: groobPlayers
      }

      const messageIdentifiers = formatPlayerIdentifier(groobPlayers)

      return generateRoleAction(gamestate, token, {
        private_message: ['action_zerbgroob', ...messageIdentifiers],
        uniqueInformations: { groobzerb: groobPlayers }
      })
    } else {
      player.player_history = { ...player.player_history, scene_title: title }

      return generateRoleAction(gamestate, token, {
        private_message: ['action_no_groob']
      })
    }
  }
}
