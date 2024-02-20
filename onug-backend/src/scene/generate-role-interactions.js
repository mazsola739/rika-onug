import { INTERACTION } from '../constant/ws';
import { updatePlayerCard } from './update-player-card';
import { getKeys, concatArraysWithUniqueElements } from './utils';

export const generateRoleInteractions = (gameState, title, token, message, icon, selectableCards, selectableMarks, showCards, showMarks, uniqInformations) => {
    updatePlayerCard(gameState, token)
    const player = gameState.players[token]
    const playerCard = player?.card
    const shielded_cards = gameState.shield
    const artifacted_cards = getKeys(gameState.artifact)
    const show_cards = showCards !== null ? concatArraysWithUniqueElements(showCards, gameState.flipped) : gameState.flipped
    const show_marks = showMarks
    const informations = {
      message,
      icon,
      shielded_cards,
      artifacted_cards,
      show_cards,
      show_marks,
      ...selectableCards,
      ...selectableMarks,
      ...uniqInformations,
    }
  
    return {
      type: INTERACTION,
      title,
      token,
      ...informations,
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    }
  };