import { generateRoleInteraction, getAnyEvenOrOddPlayers, getAnySeerPlayerNumbersByRoleIdsWithNoShield } from '../../sceneUtils'

export const psychicInteraction = (gamestate, token, title, randomPsychicInstructions, psychicKeys) => {
  const evenOrOdd = psychicKeys.replace('identifier_', '').replace('_text', '').replace('any', '')
  const selectablePlayers = getAnyEvenOrOddPlayers(gamestate.players, evenOrOdd)
  const selectablePlayerNumbers = getAnySeerPlayerNumbersByRoleIdsWithNoShield(selectablePlayers)

  const limit = +randomPsychicInstructions.replace('psychic_view', '').replace('_text', '')

  //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: limit, center: 0 },
    scene_end: selectablePlayerNumbers.length === 0
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : limit === 1 ? 'interaction_may_one_any_other' : 'interaction_may_two_any'],
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: limit, center: 0 }
    },
    scene_end: selectablePlayerNumbers.length === 0
  })
}
