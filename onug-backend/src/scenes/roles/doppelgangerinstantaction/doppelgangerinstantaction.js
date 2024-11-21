import { DOPPELGANGER_INSTANT_ACTION } from '../../../constants'
import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { instantRoleIds } from './doppelgangerinstantaction.constants'
import { doppelgangerinstantactionAction } from './doppelgangerinstantaction.action'
import { addVerboseOr, getRolesNames } from './doppelgangerinstantaction.utils'

export const doppelgangerinstantaction = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const rolesFromIds = getRolesNames(gamestate.selected_cards, DOPPELGANGER_INSTANT_ACTION, instantRoleIds)

  addVerboseOr(rolesFromIds)

  const narration = ['doppelganger_verbose_intro_text', ...rolesFromIds, 'doppelganger_verbose_outro_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).DOPPELGÄNGER) {
      gamestate.players[token].action_finished = false
      action = doppelgangerinstantactionAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
