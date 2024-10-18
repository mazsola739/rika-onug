import { getPlayerNeighborsByToken, generateRoleInteraction } from "../../sceneUtils"

export const diseasedInteraction = (gamestate, token, title) => {
    const newGamestate = { ...gamestate }
    
    const neighbors = getPlayerNeighborsByToken(newGamestate.players, token)
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_marks: neighbors, selectable_mark_limit: { mark: 1 },
    }
  
    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_must_one_neighbor'],
      icon: 'diseased',
      selectableCards: { selectable_marks: neighbors, selectable_mark_limit: { mark: 1 } },
    })
  }