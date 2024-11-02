import { generateRoleInteraction, getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from '../../sceneUtils'

export const cupidInteraction = (gamestate, token, title) => {
    const newGamestate = { ...gamestate }
    
    const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 2 },
      obligatory: true,
    }
  
    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_must_two_any'],
      selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 2 } },
      obligatory: true,
    })
  }