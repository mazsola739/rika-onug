import { STAGES } from '../constants'

export const startScene = gamestate => ({
  ...gamestate,
  stage: STAGES.GAME,
  actual_scenes: [
    {
      scene_title: 'START_GAME',
      scene_number: 0
    }
  ]
})
