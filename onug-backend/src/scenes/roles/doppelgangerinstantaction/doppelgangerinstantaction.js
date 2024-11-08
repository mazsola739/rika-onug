import { DOPPELGANGER_INSTANT_ACTION } from '../../../constants'
import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { instantRoleIds } from './doppelgangerinstantaction.constants'
import { doppelgangerinstantactionInteraction } from './doppelgangerinstantaction.interaction'
import { addVerboseOr, getRolesNames } from './doppelgangerinstantaction.utils'

export const doppelgangerinstantaction = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const rolesFromIds = getRolesNames(newGamestate.selected_cards, DOPPELGANGER_INSTANT_ACTION, instantRoleIds)

  addVerboseOr(rolesFromIds)

  const narration = ['doppelganger_verbose_intro_text', ...rolesFromIds, 'doppelganger_verbose_outro_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (isActivePlayer(card).DOPPELGÄNGER) {
      newGamestate.players[token].action_finished = false
      interaction = doppelgangerinstantactionInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
