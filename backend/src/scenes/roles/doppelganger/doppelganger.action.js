import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

//TODO shield?
export const doppelgangerAction = (gamestate, token, title) => {
  const selectable_cards = getPlayerNumbersByGivenConditions(gamestate.players, 'otherPlayersWithoutShield', gamestate.positions.shielded_cards, token)
  const selectable_card_limit = { player: 1, center: 0 }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards,
    selectable_card_limit,
    obligatory: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_must_one_any_other'],
    selectableCards: { selectable_cards, selectable_card_limit },
    obligatory: true
  })
}
