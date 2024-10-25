import { STAGES } from '../constants'

export const startScene = (gamestate) => {
  return {
    ...gamestate,
    game_started: true,
    game_paused: false,
    game_stopped: false,
    game_finished: false,
    stage: STAGES.GAME,
    actual_scene: {
      scene_title: 'GAME_START',
      scene_number: 0,
    },
  }
}
