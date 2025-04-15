import { formatPlayerIdentifier, generateRoleAction, getAllPlayerTokens, getPlayerNumbersByGivenConditions, getPlayerNumbersWithMatchingTokens } from '../../sceneUtils'
import { apprenticeassassinResponse } from './apprenticeassassin.response'

export const apprenticeassassinAction = (gamestate, token, title) => {
  const assassins = getPlayerNumbersByGivenConditions(gamestate.players, 'assassin')

  if (assassins.length > 0) {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      assassins,
      obligatory: true,
      scene_end: true
    }

    const messageIdentifiers = formatPlayerIdentifier(assassins)

    return generateRoleAction(gamestate, token, {
      private_message: ['action_assassin', ...messageIdentifiers],
      uniqueInformation: { assassins },
      obligatory: true,
      scene_end: true
    })
  } else if (assassins.length === 0) {
    const allPlayerTokens = getAllPlayerTokens(gamestate.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)

    const isSingleSelectable = selectablePlayerNumbers.length === 1

    if (isSingleSelectable) {
      apprenticeassassinResponse(gamestate, token, selectablePlayerNumbers, title)
    } else if (selectablePlayerNumbers.length > 1) {
      gamestate.players[token].player_history[title] = {
        ...gamestate.players[token].player_history[title],
        selectable_marks: selectablePlayerNumbers,
        selectable_mark_limit: { mark: 1 },
        obligatory: false
      }

      return generateRoleAction(gamestate, token, {
        private_message: ['action_may_one_any'],
        selectableMarks: {
          selectable_marks: selectablePlayerNumbers,
          selectable_mark_limit: { mark: 1 }
        },
        obligatory: false
      })
    }
  }
}
