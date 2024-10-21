import { STAGES } from '../constants'

export const isTableClosed = gamestate => gamestate.stage !== STAGES.DEALING
export const isGameStopped = gamestate => gamestate.stage !== STAGES.GAME