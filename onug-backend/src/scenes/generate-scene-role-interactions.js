//@ts-check
import { updatePlayerCard } from './update-player-card'

const getKeys = array => array.map(obj => Object.keys(obj)[0])
const concatArraysWithUniqueElements = (array1, array2) => _.uniqWith([...array1, ...array2], _.isEqual)

export const generateRoleInteraction = ( gameState, token, {
  private_message,
  icon,
  selectableCards = {},
  selectableMarks = {},
  showCards = [],
  showMarks = [],
  uniqueInformations = {}
}) => {
  updatePlayerCard(gameState, token)

  const informations = {
    shielded_cards: gameState.shield,
    artifacted_cards: getKeys(gameState.artifact),
    show_cards: showCards !== null ? concatArraysWithUniqueElements(showCards, gameState.flipped) : gameState.flipped,
    show_marks: showMarks,
    ...selectableCards,
    ...selectableMarks,
    ...uniqueInformations,
  }

  return {
    private_message,
    icon,
    ...informations,
    player_name: gameState.players[token].name,
    player_number: gameState.players[token].player_number,
    ...gameState.players[token].card,
  }
}