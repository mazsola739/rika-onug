import { STAGES } from '../constant/stage';

export const isGameTableClosed = gameState => gameState.stage !== STAGES.GAME_TABLE;
export const isGamePlayStopped = gameState => gameState.stage !== STAGES.GAME_PLAY;