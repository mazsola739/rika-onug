import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const seerAction = (gamestate, token, title) => {
  const selecatblePlayers = getPlayerNumbersByGivenConditions(gamestate.players, 'otherPlayersWithoutShield', gamestate.positions.shielded_cards, token)
  const selectable_cards = [...selecatblePlayers, ...CENTER_CARD_POSITIONS]
  const selectable_card_limit = { player: 1, center: 2 }

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_may_one_any_other', 'conjunction_or', 'action_seer_end'],
    selectableCards: { selectable_cards, selectable_card_limit }
  })
}
