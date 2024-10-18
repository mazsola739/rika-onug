import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from "../../sceneUtils"

export const empathInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  let icon = 'empath'
  const randomEmpathInstruction = newGamestate.empath.instruction

  const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)

  switch (randomEmpathInstruction) {
    case 'empath_action1_text':
      icon = 'empath'
      break
    case 'empath_action2_text':
      icon = 'pretty'
      break
    case 'empath_action3_text':
      icon = 'sus'
      break
    case 'empath_action4_text':
      icon = 'smell'
      break
    case 'empath_action5_text':
      icon = 'dress'
      break
    case 'empath_action6_text':
      icon = 'awesome'
      break
    case 'empath_action7_text':
      icon = 'select'
      break
    case 'empath_action8_text':
      icon = 'bulb'
      break
    case 'empath_action9_text':
      icon = 'friend'
      break
    case 'empath_action10_text':
      icon = 'jest'
      break
    case 'empath_action11_text':
      icon = 'trophy'
      break
    case 'empath_action12_text':
      icon = 'like'
      break
    case 'empath_action13_text':
      icon = 'think'
      break
    case 'empath_action14_text':
      icon = 'nice'
      break
  }

  newGamestate.empath.icon = icon

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
  }

  return {
    private_message: ['interaction_may_one_any'],
    icon,
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
    player_name: newGamestate.players[token].name,
    player_number: newGamestate.players[token].player_number,
    ...newGamestate.players[token].card,
  }
}
