import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, generateRoleInteraction } from "../../sceneUtils"
import { getSelectablePlayersWithNoArtifact } from "./curator.utils"

export const curatorInteraction = (gamestate, token, title) => {
    const newGamestate = { ...gamestate }
    
    const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGamestate.shield)
    const selectablePlayersWithNoArtifact = getSelectablePlayersWithNoArtifact(selectablePlayersWithNoShield, newGamestate.artifact)
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_cards: selectablePlayersWithNoArtifact, selectable_card_limit: { player: 1, center: 0 },
    }
  
    return generateRoleInteraction(newGamestate, token, {
      private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_may_one_any'],
      selectableCards: { selectable_cards: selectablePlayersWithNoArtifact, selectable_card_limit: { player: 1, center: 0 } },
    })
  }
  