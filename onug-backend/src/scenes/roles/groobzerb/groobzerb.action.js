import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const groobzerbAction = (gamestate, token, title) => {
  const zerbPlayers = getPlayerNumbersByGivenConditions(gamestate.players, 'zerb')
  const groobPlayers = getPlayerNumbersByGivenConditions(gamestate.players, 'groob')

  if (gamestate.players[token].card.player_role_id === 47) {
    if (zerbPlayers.length >= 1) {
      gamestate.players[token].card.player_team = 'groob'
      groobPlayers.forEach(groob => (gamestate.card_positions[groob].team = 'groob'))

      gamestate.players[token].player_history[title] = {
        ...gamestate.players[token].player_history[title],
        zerb: zerbPlayers,
        scene_end: true
      }

      const messageIdentifiers = formatPlayerIdentifier(zerbPlayers)

      return generateRoleAction(gamestate, token, {
        private_message: ['action_zerb', ...messageIdentifiers],
        uniqueInformation: { groobzerb: zerbPlayers },
        scene_end: true
      })
    } else {
      gamestate.players[token].player_history = { ...gamestate.players[token].player_history, scene_title: title }

      return generateRoleAction(gamestate, token, {
        private_message: ['action_no_zerb']
      })
    }
  } else if (gamestate.players[token].card.player_role_id === 54) {
    if (groobPlayers.length >= 1) {
      gamestate.players[token].card.player_team = 'zerb'
      zerbPlayers.forEach(zerb => (gamestate.card_positions[zerb].team = 'zerb'))

      gamestate.players[token].player_history[title] = {
        ...gamestate.players[token].player_history[title],
        groob: groobPlayers,
        scene_end: true
      }

      const messageIdentifiers = formatPlayerIdentifier(groobPlayers)

      return generateRoleAction(gamestate, token, {
        private_message: ['action_groob', ...messageIdentifiers],
        uniqueInformation: { groobzerb: groobPlayers },
        scene_end: true
      })
    } else {
      gamestate.players[token].player_history = { ...gamestate.players[token].player_history, scene_title: title }

      return generateRoleAction(gamestate, token, {
        private_message: ['action_no_groob']
      })
    }
  }
}
