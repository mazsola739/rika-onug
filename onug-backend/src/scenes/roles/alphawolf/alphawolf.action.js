import { generateRoleAction } from '../../sceneUtils'
import { getNonWerewolfPlayerNumbersByRoleIdsWithNoShield } from './alphawolf.utils'

export const alphawolfInteraction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getNonWerewolfPlayerNumbersByRoleIdsWithNoShield(gamestate.players)

  /* TODO   const isSingleSelectable = selectablePlayerNumbers.length === 1

  if (isSingleSelectable) {
  } */

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 0 },
    obligatory: true,
    scene_end: selectablePlayerNumbers.length === 0
  }

  return generateRoleAction(gamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_must_one_any_non_werewolf'],
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 }
    },
    obligatory: true,
    scene_end: selectablePlayerNumbers.length === 0
  })
}
