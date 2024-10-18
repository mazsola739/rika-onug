import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from "../../sceneUtils"

export const empathInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
  }

  return {
    private_message: ['interaction_may_one_any'],
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
    player_name: newGamestate.players[token].name,
    player_number: newGamestate.players[token].player_number,
    ...newGamestate.players[token].card,
  }
}
