import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const robberAction = (gamestate, token, title) => {
  if (!gamestate.players[token].shield) {
    const selectable_cards = getPlayerNumbersByGivenConditions(gamestate, 'otherPlayersWithoutShield', token)
    const selectable_card_limit = { player: 1, center: 0 }
    const scene_end = selectable_cards.length === 0

    console.log('selectable_cards', selectable_cards)

    return generateRoleAction(gamestate, token, title, {
      private_message: [scene_end ? 'action_no_selectable_player' : 'action_may_one_any_other'],
      selectableCards: { selectable_cards, selectable_card_limit },
      scene_end
    })
  } else {
    return generateRoleAction(gamestate, token, title, {
      private_message: ['action_shielded'],
      scene_end: true
    })
  }
}
