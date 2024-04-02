//@ts-check
import { getKeys, concatArraysWithUniqueElements } from '../utils'
import { updatePlayerCard } from './update-player-card'

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