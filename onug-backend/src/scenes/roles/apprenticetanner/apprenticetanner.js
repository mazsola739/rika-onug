import { ALL_COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime } from '../../../utils'
import { apprenticetannerInteraction } from './apprenticetanner.interaction'

export const apprenticetanner = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_apprenticetanner_kickoff_text'
      : 'apprenticetanner_kickoff_text',
    'apprenticetanner_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 71 || (card.player_role_id === 71 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = apprenticetannerInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
