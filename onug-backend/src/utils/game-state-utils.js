//@ts-check
import { STAGES } from '../constant'

export const isGameTableClosed = gameState => gameState.stage !== STAGES.GAME_TABLE
export const isGamePlayStopped = gameState => gameState.stage !== STAGES.GAME_PLAY