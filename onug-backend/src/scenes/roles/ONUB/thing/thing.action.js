import { generateRoleAction, getPlayerNeighborsByToken } from '../../../sceneUtils'
import { thingResponse } from './thing.response'

export const thingAction = (gamestate, token, title) => {
  const neighbors = getPlayerNeighborsByToken(gamestate.players, token, 'both', 1)

  const isSingleSelectable = neighbors.length === 1

  if (isSingleSelectable) {
    thingResponse(gamestate, token, neighbors, title)
  } else if (neighbors.length > 1) {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      selectable_cards: neighbors,
      selectable_card_limit: { player: 1, center: 0 },
      obligatory: true
    }

    return generateRoleAction(gamestate, token, {
      private_message: ['action_must_one_neighbor'],
      selectableCards: {
        selectable_cards: neighbors,
        selectable_card_limit: { player: 1, center: 0 }
      },
      obligatory: true
    })
  }
}
