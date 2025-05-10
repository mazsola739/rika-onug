import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const apprenticeassassinAction = (gamestate, token, title) => {
  const assassins = getPlayerNumbersByGivenConditions(gamestate.players, 'assassin')

  if (assassins.length > 0) {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      assassins,
      scene_end: true
    }

    const messageIdentifiers = formatPlayerIdentifier(assassins)

    return generateRoleAction(gamestate, token, {
      private_message: ['action_assassin', ...messageIdentifiers, 'POINT'],
      uniqueInformation: { assassins },
      obligatory: true,
      scene_end: true
    })
  } else if (assassins.length === 0) {
    const selectable_marks = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayers')
    const selectable_mark_limit = { mark: 1 }

    if (selectable_marks.length > 1) {
      gamestate.players[token].player_history[title] = {
        ...gamestate.players[token].player_history[title],
        selectable_marks,
        selectable_mark_limit,
      }

      return generateRoleAction(gamestate, token, {
        private_message: ['action_may_one_any'],
        selectableMarks: { selectable_marks, selectable_mark_limit },
      })
    }
  }
}
