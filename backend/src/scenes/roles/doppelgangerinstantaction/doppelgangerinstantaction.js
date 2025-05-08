import { DOPPELGANGER_INSTANT_ACTION } from '../../../constants'
import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { instantRoleIds } from './doppelgangerinstantaction.constants'
import { doppelgangerinstantactionAction } from './doppelgangerinstantaction.action'

const getRolesNames = (selectedCardIds, actionIds, roles) => selectedCardIds.filter(id => actionIds.includes(id)).map(id => roles[id])

const addVerboseOr = rolesFromIds => {
  if (rolesFromIds.length > 1) {
    rolesFromIds.splice(rolesFromIds.length - 1, 0, 'doppelganger_verbose_or')
  }
  rolesFromIds
}

export const doppelgangerinstantaction = (gamestate, title, selected_cards) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const rolesFromIds = getRolesNames(selected_cards, DOPPELGANGER_INSTANT_ACTION, instantRoleIds)

  addVerboseOr(rolesFromIds)

  const narration = ['doppelganger_verbose_intro', ...rolesFromIds, 'doppelganger_verbose_outro']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).DOPPELGANGER) {
      gamestate.players[token].action_finished = false

      action = doppelgangerinstantactionAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
