import { generateRoleInteraction } from '../../sceneUtils'
import { getNonWerewolfPlayerNumbersByRoleIdsWithNoShield } from './alphawolf.utils'

export const alphawolfInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const selectablePlayerNumbers = getNonWerewolfPlayerNumbersByRoleIdsWithNoShield(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 0 },
    obligatory: true
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_must_one_any_non_werewolf'],
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 }
    },
    obligatory: true
  })
}
