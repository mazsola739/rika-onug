import { generateRoleAction, getPlayerNeighborsByToken } from '../../sceneUtils'

export const diseasedInteraction = (gamestate, token, title) => {
  const neighbors = getPlayerNeighborsByToken(gamestate.players, token, 'both', 1)

  //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks: [...neighbors.left, ...neighbors.right],
    selectable_mark_limit: { mark: 1 },
    obligatory: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['interaction_must_one_neighbor'],
    selectableCards: {
      selectable_marks: [...neighbors.left, ...neighbors.right],
      selectable_mark_limit: { mark: 1 }
    },
    obligatory: true
  })
}
