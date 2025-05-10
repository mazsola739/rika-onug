import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const robberAction = (gamestate, token, title) => {
  if (!gamestate.players[token].shield) {
    const selectable_cards = getPlayerNumbersByGivenConditions(gamestate.players, 'otherPlayersWithoutShield', gamestate.positions.shielded_cards, token)
    const selectable_card_limit = { player: 1, center: 0 }
    const scene_end = selectable_cards.length === 0

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      selectable_cards,
      selectable_card_limit,
      scene_end
    }

    return generateRoleAction(gamestate, token, {
      private_message: [scene_end ? 'action_no_selectable_player' : 'action_may_one_any_other'],
      selectableCards: { selectable_cards, selectable_card_limit },
      scene_end
    })
  } else {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      shielded: true,
      scene_end: true
    }

    return generateRoleAction(gamestate, token, {
      private_message: ['action_shielded'],
      scene_end: true
    })
  }
}
