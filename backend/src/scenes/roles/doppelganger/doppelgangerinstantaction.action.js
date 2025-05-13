import { alphawolfAction, apprenticeseerAction, cupidAction, diseasedAction, drunkAction, instigatorAction, mysticwolfAction, paranormalinvestigatorAction, robberAction, seerAction, sentinelAction, temptressAction, thingAction, troublemakerAction, villageidiotAction, witchAction } from '..'
import { DOPPELGANGER_INSTANT_ACTION } from '../../../constants'
import { generateRoleAction } from '../../sceneUtils'

export const doppelgangerinstantactionAction = (gamestate, token, title) => {
  const new_role_id = gamestate.players[token]?.new_role_id

  if (!DOPPELGANGER_INSTANT_ACTION.includes(new_role_id)) {
    return generateRoleAction(gamestate, token, title, {
      private_message: ['no_night_action'],
      scene_end: true
    })
  }

  const instantAction = {
    2: drunkAction,
    8: robberAction,
    9: seerAction,
    11: troublemakerAction,
    17: alphawolfAction,
    18: apprenticeseerAction,
    22: mysticwolfAction,
    23: paranormalinvestigatorAction,
    25: sentinelAction,
    26: villageidiotAction,
    27: witchAction,
    31: cupidAction,
    32: diseasedAction,
    34: instigatorAction,
    55: thingAction,
    56: seerAction,
    57: mysticwolfAction,
    65: apprenticeseerAction,
    66: robberAction,
    68: troublemakerAction,
    69: temptressAction,
    70: witchAction,
    85: thingAction
  }

  const doppelgangerInstantAction = instantAction[new_role_id]

  return doppelgangerInstantAction ? doppelgangerInstantAction(gamestate, token, title) : {}
}
