import { toggleCardSelect, getCardById, distributeCards, isCardSelectedById } from './card';
import { determineTotalPlayers, getGameTableBoard, getGamePlayBoard } from './player';
import { randomPlayerName } from './name-generator';
import { sanitize, truncate } from './sanitizer';
import { isGameTableClosed, isGamePlayStopped } from './game-state';
import { buildSceneForCardId } from './scene';

export default {
  toggleCardSelect,
  determineTotalPlayers,
  randomPlayerName,
  sanitize,
  truncate,
  isGameTableClosed,
  isGamePlayStopped,
  getGameTableBoard,
  getGamePlayBoard,
  buildSceneForCardId,
  getCardById,
  distributeCards,
  isCardSelectedById,
};
