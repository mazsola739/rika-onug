import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, generateRoleInteraction } from "../../sceneUtils"

export const cupidInteraction = (gamestate, token, title) => {
    const newGamestate = { ...gamestate }
    
    const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 2 },
    }
  
    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_must_two_any'],
      icon: 'cupid',
      selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 2 } },
    })
  }