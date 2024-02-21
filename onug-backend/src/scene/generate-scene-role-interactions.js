import { INTERACTION } from '../constant/ws';
import { updatePlayerCard } from './update-player-card';
import { getKeys, concatArraysWithUniqueElements } from './utils';

export const generateSceneRoleInteractions = ({
  gameState,
  title,
  token,
  narration,
  private_message = '',
  icon,
  selectableCards = null,
  selectableMarks = null,
  showCards = null,
  showMarks = null,
  uniqInteractions = null
}) => {
  updatePlayerCard(gameState, token)

  const interactions = {
    narration,
    private_message,
    icon,
    shielded_cards: gameState.shield,
    artifacted_cards: getKeys(gameState.artifact),
    show_cards: showCards !== null ? concatArraysWithUniqueElements(showCards, gameState.flipped) : gameState.flipped,
    show_marks: showMarks,
    ...selectableCards,
    ...selectableMarks,
    ...uniqInteractions,
  }

  return {
    type: INTERACTION,
    title,
    token,
    ...interactions,
    player_name: gameState.players[token].name,
    player_number: gameState.players[token].player_number,
    ...gameState.players[token].card,
  }
}