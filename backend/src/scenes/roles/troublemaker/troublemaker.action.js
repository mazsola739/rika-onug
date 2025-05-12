import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const troublemakerAction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getPlayerNumbersByGivenConditions(gamestate, 'otherPlayersWithoutShield', token)
  const selectable_cards = selectablePlayerNumbers.length >= 2 ? selectablePlayerNumbers : []
  const selectable_card_limit = { player: selectablePlayerNumbers.length >= 2 ? 2 : 0, center: 0 }
  const scene_end = selectablePlayerNumbers.length === 0

  return generateRoleAction(gamestate, token, title, {
    private_message: [selectable_cards.length >= 2 ? 'action_may_two_any_other' : 'action_no_selectable_player'],
    selectableCards: { selectable_cards, selectable_card_limit },
    scene_end
  })
}
