import { STAGES } from '../constants'

export const startScene = (gamestate) => ({
  ...gamestate,
  stage: STAGES.GAME,
  actual_scene: {
    scene_title: 'GAME_START',
    scene_number: 0,
  },
})
