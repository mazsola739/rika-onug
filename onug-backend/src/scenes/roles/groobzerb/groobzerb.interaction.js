import {
  formatPlayerIdentifier,
  generateRoleInteraction,
  getGroobPlayerNumberByRoleIds,
  getZerbPlayerNumberByRoleIds,
} from '../../sceneUtils'

export const groobzerbInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const player = newGamestate.players[token]

  const zerbPlayers = getZerbPlayerNumberByRoleIds(newGamestate.players)
  const groobPlayers = getGroobPlayerNumberByRoleIds(newGamestate.players)

  if (player.player_role_id === 47) {
    if (zerbPlayers.length >= 1) {
      newGamestate.players[token].card.player_team = 'groob'
      groobPlayers.forEach(
        (groob) => (newGamestate.card_positions[groob].team = 'groob')
      )

      player.player_history[title] = {
        ...player.player_history[title],
        zerb: zerbPlayers,
      }

      const messageIdentifiers = formatPlayerIdentifier(zerbPlayers)

      return generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_zerbgroob', ...messageIdentifiers],
        uniqueInformations: { groobzerb: zerbPlayers },
      })
    } else {
      player.player_history = { ...player.player_history, scene_title: title }

      return generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_no_zerb'],
      })
    }
  } else if (player.player_role_id === 54) {
    if (groobPlayers.length >= 1) {
      newGamestate.players[token].card.player_team = 'zerb'
      zerbPlayers.forEach(
        (zerb) => (newGamestate.card_positions[zerb].team = 'zerb')
      )

      player.player_history[title] = {
        ...player.player_history[title],
        groob: groobPlayers,
      }

      const messageIdentifiers = formatPlayerIdentifier(groobPlayers)

      return generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_zerbgroob', ...messageIdentifiers],
        uniqueInformations: { groobzerb: groobPlayers },
      })
    } else {
      player.player_history = { ...player.player_history, scene_title: title }

      return generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_no_groob'],
      })
    }
  }
}
