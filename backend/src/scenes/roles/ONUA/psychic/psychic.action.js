import { generateRoleAction, getAnyEvenOrOddPlayerNumbers } from '../../../sceneUtils'

export const psychicAction = (gamestate, token, title, prefix) => {
  const randomPsychicInstruction = gamestate[prefix].instruction
  const psychicKey = gamestate[prefix].key

  const evenOrOdd = psychicKey.replace('identifier_', '').replace('_text', '').replace('any', '')
  const selectablePlayers = getAnyEvenOrOddPlayerNumbers(gamestate.players, evenOrOdd)
  let limit = +randomPsychicInstruction.replace('psychic_view', '').replace('_text', '')

  if (selectablePlayers.length === 1) {
    limit = 1
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayers,
    selectable_card_limit: { player: limit, center: 0 },
    scene_end: selectablePlayers.length === 0
  }

  return generateRoleAction(gamestate, token, {
    private_message: [selectablePlayers.length === 0 ? 'action_no_selectable_player' : limit === 1 ? 'action_may_one_any_other' : 'action_may_two_any'],
    selectableCards: {
      selectable_cards: selectablePlayers,
      selectable_card_limit: { player: limit, center: 0 }
    },
    scene_end: selectablePlayers.length === 0
  })
}
