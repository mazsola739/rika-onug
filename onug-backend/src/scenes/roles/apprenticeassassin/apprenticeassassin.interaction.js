import { formatPlayerIdentifier, generateRoleInteraction, getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from "../../sceneUtils"
import { getAssassinPlayerNumbersByRoleIds } from "./apprenticeassassin.utils"

export const apprenticeassassinInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const assassins = getAssassinPlayerNumbersByRoleIds(newGamestate.players)

  if (assassins.length > 0) {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      assassins,
    }

    const messageIdentifiers = formatPlayerIdentifier(assassins)

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_assassin', ...messageIdentifiers],
      uniqueInformations: { assassins },
    })
  } else if (assassins.length === 0) {
    const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 },
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_may_one_any'],
      selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
    })
  }
}
