import { generateRoleAction, getPlayerNeighborsByToken } from '../../sceneUtils'

export const thingAction = (gamestate, token, title) => {
  const selectable_cards = getPlayerNeighborsByToken(gamestate.players, token, 'both', 1)
  const selectable_card_limit = { player: 1, center: 0 }

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_must_one_neighbor'],
    selectableCards: { selectable_cards, selectable_card_limit },
    obligatory: true
  })
}
