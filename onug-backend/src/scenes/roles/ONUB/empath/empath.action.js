import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from '../../../sceneUtils'

export const empathEveryoneAction = (gamestate, token, title, prefix) => {
  console.log(prefix) //TODO remove this line and fix?

  const allPlayerTokens = getAllPlayerTokens(gamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 0 }
  }

  return {
    private_message: ['action_may_one_any'],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 0 },
    player_name: gamestate.players[token].name,
    player_number: gamestate.players[token].player_number
  }
}

export const empathAction = (gamestate, token, title, prefix) => {
  console.log(prefix) //TODO remove this line and fix?

  const allPlayerTokens = getAllPlayerTokens(gamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 0 }
  }

  return {
    private_message: ['action_may_one_any'],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 0 },
    player_name: gamestate.players[token].name,
    player_number: gamestate.players[token].player_number
  }
}