
import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { instantRoleIds } from './doppelgangerinstantaction.constants'
import { doppelgangerinstantactionInteraction } from './doppelgangerinstantaction.interaction'
import { addVerboseOr, getRolesNames } from './doppelgangerinstantaction.utils'

export const doppelgangerinstantaction = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)  
  const rolesFromIds = getRolesNames(newGamestate.selected_cards, IDS.DOPPELGANGER_INSTANT_ACTION_IDS, instantRoleIds)

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

    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction, narration })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
