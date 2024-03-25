//@ts-check
import { getKeys, concatArraysWithUniqueElements } from '../utils'
import { updatePlayerCard } from './update-player-card'

export const generateRoleInteraction = ( newGameState, token, {
  private_message,
  icon,
  selectableCards = {},
  selectableMarks = {},
  showCards = [],
  showMarks = [],
  uniqInformations = {}
}) => {
  updatePlayerCard(newGameState, token)

  const informations = {
    shielded_cards: newGameState.shield,
    artifacted_cards: getKeys(newGameState.artifact),
    show_cards: showCards !== null ? concatArraysWithUniqueElements(showCards, newGameState.flipped) : newGameState.flipped,
    show_marks: showMarks,
    ...selectableCards,
    ...selectableMarks,
    ...uniqInformations,
  }

  return {
    private_message,
    icon,
    ...informations,
    player_name: newGameState.players[token].name,
    player_number: newGameState.players[token].player_number,
    ...newGameState.players[token].card,
  }
}