import { DOPPELGANGER_INSTANT_ACTION_IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime } from '../../../utils'
import { doppelgangerinstantactionInteraction } from './doppelgangerinstantaction.interaction'
import { instantRoleIds } from './doppelgangerinstantaction.constants'
import { addVerboseOr, getRolesNames } from './doppelgangerinstantaction.utils'

export const doppelgangerinstantaction = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)  
  const rolesFromIds = getRolesNames(newGamestate.selected_cards, DOPPELGANGER_INSTANT_ACTION_IDS, instantRoleIds)
  const actionTime = 8

  addVerboseOr(rolesFromIds)
  
  const narration = [
    'doppelganger_verbose_intro_text',
    ...rolesFromIds,
    'doppelganger_verbose_outro_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 1) {
      interaction = doppelgangerinstantactionInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
