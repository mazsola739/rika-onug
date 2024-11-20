import { DOPPELGANGER_INSTANT_ACTION } from '../../../constants'
import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { instantRoleIds } from './doppelgangerinstantaction.constants'
import { doppelgangerinstantactionInteraction } from './doppelgangerinstantaction.interaction'
import { addVerboseOr, getRolesNames } from './doppelgangerinstantaction.utils'

export const doppelgangerinstantaction = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const rolesFromIds = getRolesNames(gamestate.selected_cards, DOPPELGANGER_INSTANT_ACTION, instantRoleIds)

  addVerboseOr(rolesFromIds)

  const narration = ['doppelganger_verbose_intro_text', ...rolesFromIds, 'doppelganger_verbose_outro_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).DOPPELGÄNGER) {
      gamestate.players[token].action_finished = false
      interaction = doppelgangerinstantactionInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
