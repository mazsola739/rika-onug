import {
  generateRoleInteraction,
  getSelectableOtherPlayerNumbersWithNoShield,
} from '../../sceneUtils'

export const flipperInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(
    newGamestate.players,
    token
  )

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [
      selectablePlayerNumbers.length === 0
        ? 'interaction_no_selectable_player'
        : 'interaction_may_one_any_other',
    ],
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 },
    },
  })
}
