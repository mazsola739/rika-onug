import { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, generateRoleInteraction } from "../../sceneUtils"

//TODO shield?
export const doppelgangerInteraction = (gamestate, token, title) => {
    const newGamestate = { ...gamestate }
  
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGamestate.players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGamestate.shield)
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 },
    }
  
    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_must_one_any_other'],
      selectableCards: { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
    })
  }
  