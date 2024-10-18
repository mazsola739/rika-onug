import { STAGES } from '../constants'

export const isGameTableClosed = gamestate => gamestate.stage !== STAGES.DEALING
export const isGamePlayStopped = gamestate => gamestate.stage !== STAGES.GAME