import { updatePlayerCard } from './update-player-card';
import { getKeys, concatArraysWithUniqueElements } from './utils';

export const generateRoleInteraction = ({
  newGameState,
  private_message = [''],
  icon = '',
  selectableCards = null,
  selectableMarks = null,
  showCards = null,
  showMarks = null,
  uniqInformations = null
}) => {
  updatePlayerCard(newGameState, token)

  const informations = {
    private_message,
    icon,
    shielded_cards: newGameState.shield,
    artifacted_cards: getKeys(newGameState.artifact),
    show_cards: showCards !== null ? concatArraysWithUniqueElements(showCards, newGameState.flipped) : newGameState.flipped,
    show_marks: showMarks,
    ...selectableCards,
    ...selectableMarks,
    ...uniqInformations,
  }

  return {
    ...informations,
    player_name: newGameState.players[token].name,
    player_number: newGameState.players[token].player_number,
    ...newGameState.players[token].card,
  }
}