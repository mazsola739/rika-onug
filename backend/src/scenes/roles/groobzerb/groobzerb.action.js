import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const groobzerbAction = (gamestate, token, title) => {
  const zerb = getPlayerNumbersByGivenConditions(gamestate, 'zerb')
  const groob = getPlayerNumbersByGivenConditions(gamestate, 'groob')

  if (gamestate.players[token].card.player_role_id === 47) {
    if (zerb.length >= 1) {
      gamestate.players[token].card.player_team = 'groob'
      groob.forEach(groob => (gamestate.positions.card_positions[groob].team = 'groob'))
      
      const messageIdentifiers = formatPlayerIdentifier(zerb)

      return generateRoleAction(gamestate, token, title, {
        private_message: ['action_zerb', ...messageIdentifiers, 'POINT'],
        uniqueInformation: { groobzerb: zerb, zerb },
        scene_end: true
      })
    } else {
      return generateRoleAction(gamestate, token, title, {
        private_message: ['action_no_zerb'],
        scene_end: true
      })
    }
  } else if (gamestate.players[token].card.player_role_id === 54) {
    if (groob.length >= 1) {
      gamestate.players[token].card.player_team = 'zerb'
      zerb.forEach(zerb => (gamestate.positions.card_positions[zerb].team = 'zerb'))

      const messageIdentifiers = formatPlayerIdentifier(groob)

      return generateRoleAction(gamestate, token, title, {
        private_message: ['action_groob', ...messageIdentifiers, 'POINT'],
        uniqueInformation: { groobzerb: groob, groob },
        scene_end: true
      })
    } else {
      return generateRoleAction(gamestate, token, title, {
        private_message: ['action_no_groob'],
        scene_end: true
      })
    }
  }
}
