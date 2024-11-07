import { STAGES } from '../constants'

export const isTableClosed = gamestate => gamestate.stage !== STAGES.TABLE
export const isGameStopped = gamestate => gamestate.stage !== STAGES.GAME
