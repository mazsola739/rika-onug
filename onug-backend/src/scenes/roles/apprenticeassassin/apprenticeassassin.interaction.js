import { formatPlayerIdentifier, generateRoleInteraction, getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from '../../sceneUtils'
import { getAssassinPlayerNumbersByRoleIds } from './apprenticeassassin.utils'

export const apprenticeassassinInteraction = (gamestate, token, title) => {
  const assassins = getAssassinPlayerNumbersByRoleIds(gamestate.players)

  if (assassins.length > 0) {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      assassins,
      obligatory: true,
      scene_end: true
    }

    const messageIdentifiers = formatPlayerIdentifier(assassins)

    return generateRoleInteraction(gamestate, token, {
      private_message: ['interaction_assassin', ...messageIdentifiers],
      uniqueInformations: { assassins },
      obligatory: true,
      scene_end: true
    })
  } else if (assassins.length === 0) {
    const allPlayerTokens = getAllPlayerTokens(gamestate.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)

    //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      selectable_marks: selectablePlayerNumbers,
      selectable_mark_limit: { mark: 1 },
      obligatory: false
    }

    return generateRoleInteraction(gamestate, token, {
      private_message: ['interaction_may_one_any'],
      selectableMarks: {
        selectable_marks: selectablePlayerNumbers,
        selectable_mark_limit: { mark: 1 }
      },
      obligatory: false
    })
  }
}
