import { concatArraysWithUniqueElements, getKeys, updatePlayerCard } from "./utils"

export const generateRoleInteraction = (gamestate, token, {
  private_message,
  icon,
  selectableCards = {},
  selectableMarks = {},
  showCards = [],
  showMarks = [],
  uniqueInformations = {}
}) => {
  updatePlayerCard(gamestate, token)

  const informations = {
    shielded_cards: gamestate.shield,
    artifacted_cards: getKeys(gamestate.artifact),
    show_cards: showCards !== null ? concatArraysWithUniqueElements(showCards, gamestate.flipped) : gamestate.flipped,
    show_marks: showMarks,
    ...selectableCards,
    ...selectableMarks,
    ...uniqueInformations,
  }

  return {
    private_message,
    icon,
    ...informations,
    player_name: gamestate.players[token].name,
    player_number: gamestate.players[token].player_number,
    ...gamestate.players[token].card,
  }
}
