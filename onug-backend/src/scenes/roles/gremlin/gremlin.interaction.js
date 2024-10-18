import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, generateRoleInteraction } from "../../sceneUtils"

export const gremlinInteraction = (gamestate, token, title) => {
    const newGamestate = { ...gamestate }
  
    const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGamestate.shield)
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 2 },
      selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 2, center: 0 },
    }
  
    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_must_two_any'],
      selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 2 } },
      selectableCards: { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 2, center: 0 } },
    })
  }
  