import { COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getAllPlayerTokens, getSceneEndTime } from '../../utils'
import { mysticwolfInteraction } from './mysticwolf'

export const drpeeker = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['drpeeker_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 57 || (card.player_role_id === 57 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = mysticwolfInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
