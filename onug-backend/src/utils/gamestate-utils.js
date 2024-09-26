import { STAGES } from '../constants'

export const isGameTableClosed = gamestate => gamestate.stage !== STAGES.GAME_TABLE
export const isGamePlayStopped = gamestate => gamestate.stage !== STAGES.GAME_PLAY