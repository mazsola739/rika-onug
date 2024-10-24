import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime } from '../../sceneUtils'
import { cupidInteraction } from './cupid.interaction'

export const cupid = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['cupid_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 31 || (card.player_role_id === 31 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = cupidInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
