import { INTERACTION } from '../constant/ws';
import { updatePlayerCard } from './update-player-card';
import { getKeys, concatArraysWithUniqueElements } from './utils';

export const generateSceneRoleInteractions = (
  gameState,
  title,
  token,
  narration,
  message,
  icon,
  selectableCards,
  selectableMarks,
  showCards,
  showMarks,
  uniqInformations
) => {
  //{gameState, title, token, narration, message, icon, selectableCards, selectableMarks, showCards, showMarks, uniqInformations}
  //{shield, artifact, flipped, players} = gameState
  
  updatePlayerCard(gameState, token)

  const informations = {
    narration,
    message,
    icon,
    shielded_cards: gameState.shield,
    artifacted_cards: getKeys(gameState.artifact),
    show_cards: showCards !== null ? concatArraysWithUniqueElements(showCards, gameState.flipped) : gameState.flipped,
    show_marks: showMarks,
    ...selectableCards,
    ...selectableMarks,
    ...uniqInformations,
  }

  return {
    type: INTERACTION,
    title,
    token,
    ...informations,
    player_name: gameState.players[token].name,
    player_number: gameState.players[token].player_number,
    ...gameState.players[token].card,
  }
}