import { generateRoleAction, getAnyEvenOrOddPlayerNumbers } from '../../sceneUtils'

export const psychicAction = (gamestate, token, title, prefix) => {
  const randomPsychicInstruction = gamestate.roles[prefix].instruction
  const psychicKey = gamestate.roles[prefix].key
  const evenOrOdd = psychicKey.replace('identifier_', '').replace('any', '')
  
  const selectable_cards = getAnyEvenOrOddPlayerNumbers(gamestate.players, evenOrOdd)
  let limit = +randomPsychicInstruction.replace('psychic_view', '')

  if (selectable_cards.length === 1) {
    limit = 1
  }

  const selectable_card_limit = { player: limit, center: 0 }
  const scene_end = selectable_cards.length === 0

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards,
    selectable_card_limit,
    scene_end
  }

  return generateRoleAction(gamestate, token, {
    private_message: [scene_end ? 'action_no_selectable_player' : limit === 1 ? 'action_may_one_any_other' : 'action_may_two_any'],
    selectableCards: { selectable_cards, selectable_card_limit },
    scene_end
  })
}
