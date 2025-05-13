import { DOPPELGANGER_INSTANT_ACTION } from '../../../constants'
import { instantRoleIds } from './doppelgangerinstantaction.constants'

export const doppelgangerinstantactionNarration = selected_cards => {
  const getRolesNames = (selectedCardIds, actionIds, roles) => selectedCardIds.filter(id => actionIds.includes(id)).map(id => roles[id])

  const addVerboseOr = rolesFromIds => {
    if (rolesFromIds.length > 1) {
      rolesFromIds.splice(rolesFromIds.length - 1, 0, 'doppelganger_verbose_or')
    }
    rolesFromIds
  }
  const rolesFromIds = getRolesNames(selected_cards, DOPPELGANGER_INSTANT_ACTION, instantRoleIds)

  addVerboseOr(rolesFromIds)

  const narration = ['doppelganger_verbose_intro', ...rolesFromIds, 'doppelganger_verbose_outro']

  return narration
}
