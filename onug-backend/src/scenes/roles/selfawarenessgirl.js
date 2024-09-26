import { ALL_COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getAllPlayerTokens, getSceneEndTime } from '../../utils'
import { insomniacInteraction } from './insomniac'

export const selfawarenessgirl = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_selfawarenessgirl_kickoff_text'
      : 'selfawarenessgirl_kickoff_text',
    'selfawarenessgirl_kickoff2_text',
  ]
  const actionTime = 6

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 67 || (card.player_role_id === 67 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = insomniacInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
