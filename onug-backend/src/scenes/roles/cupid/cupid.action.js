import { generateRoleAction, getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from '../../sceneUtils'

export const cupidInteraction = (gamestate, token, title) => {
  const allPlayerTokens = getAllPlayerTokens(gamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)

  //const isTwoSelectable = selectablePlayerNumbers.length === 2

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers,
    selectable_mark_limit: { mark: 2 },
    obligatory: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_must_two_any'],
    selectableMarks: {
      selectable_marks: selectablePlayerNumbers,
      selectable_mark_limit: { mark: 2 }
    },
    obligatory: true
  })
}
