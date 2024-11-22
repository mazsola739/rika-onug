import { generateRoleAction, getAnyEvenOrOddPlayerNumbers, getAnySeerPlayerNumbersByRoleIdsWithNoShield } from '../../sceneUtils'

export const psychicAction = (gamestate, token, title, randomPsychicInstructions, psychicKeys) => {
  const evenOrOdd = psychicKeys.replace('identifier_', '').replace('_text', '').replace('any', '')
  const selectablePlayers = getAnyEvenOrOddPlayerNumbers(gamestate.players, evenOrOdd)
  const selectablePlayerNumbers = getAnySeerPlayerNumbersByRoleIdsWithNoShield(selectablePlayers, gamestate.shielded_cards)

  const limit = +randomPsychicInstructions.replace('psychic_view', '').replace('_text', '')

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: limit, center: 0 },
    scene_end: selectablePlayerNumbers.length === 0
  }

  return generateRoleAction(gamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'action_no_selectable_player' : limit === 1 ? 'action_may_one_any_other' : 'action_may_two_any'],
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: limit, center: 0 }
    },
    scene_end: selectablePlayerNumbers.length === 0
  })
}
