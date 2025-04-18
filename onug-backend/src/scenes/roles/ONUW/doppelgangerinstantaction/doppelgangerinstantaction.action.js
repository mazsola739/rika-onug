import { alphawolfAction, apprenticeseerAction, cupidAction, diseasedAction, drunkAction, instigatorAction, mysticwolfAction, paranormalinvestigatorAction, robberAction, seerAction, sentinelAction, temptressAction, thingAction, troublemakerAction, villageidiotAction, witchAction } from '../..'
import { DOPPELGANGER_INSTANT_ACTION } from '../../../../constants'
import { generateRoleAction } from '../../../sceneUtils'

/*
 Doppelgänger instant night actions:
 2 Drunk, 8 Robber, 9 Seer , 11 Troublemaker, 17 Alpha wolf, 18 Apprenticeseer, 22 Mystic wolf, 23 Paranormal investigator, 25 Sentinel, 26 Village idiot, 27 Witch, 31 Cupid, 32 Diseased, 34 Instigator, 55 Annoyinglad, 56 Detector, 57 Dr peeker, 65 Rapscallion, 66 Role retriever, 68 Switcheroo, 69 Temptress, 70 Voodoolou, 85 Thing
*/

export const doppelgangerinstantactionAction = (gamestate, token, title) => {
  const new_role_id = gamestate.players[token]?.new_role_id

  if (!DOPPELGANGER_INSTANT_ACTION.includes(new_role_id)) {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      scene_end: true
    }

    return generateRoleAction(gamestate, token, {
      private_message: ['no_night_action'],
      scene_end: true
    })
  }

  let action = {}

  if (new_role_id === 2) action = drunkAction(gamestate, token, title)
  if (new_role_id === 8) action = robberAction(gamestate, token, title)
  if (new_role_id === 9) action = seerAction(gamestate, token, title)
  if (new_role_id === 11) action = troublemakerAction(gamestate, token, title)
  if (new_role_id === 17) action = alphawolfAction(gamestate, token, title)
  if (new_role_id === 18) action = apprenticeseerAction(gamestate, token, title)
  if (new_role_id === 22) action = mysticwolfAction(gamestate, token, title)
  if (new_role_id === 23) action = paranormalinvestigatorAction(gamestate, token, title)
  if (new_role_id === 25) action = sentinelAction(gamestate, token, title)
  if (new_role_id === 26) action = villageidiotAction(gamestate, token, title)
  if (new_role_id === 27) action = witchAction(gamestate, token, title)
  if (new_role_id === 31) action = cupidAction(gamestate, token, title)
  if (new_role_id === 32) action = diseasedAction(gamestate, token, title)
  if (new_role_id === 34) action = instigatorAction(gamestate, token, title)
  if (new_role_id === 55) action = thingAction(gamestate, token, title)
  if (new_role_id === 56) action = seerAction(gamestate, token, title)
  if (new_role_id === 57) action = mysticwolfAction(gamestate, token, title)
  if (new_role_id === 65) action = apprenticeseerAction(gamestate, token, title)
  if (new_role_id === 66) action = robberAction(gamestate, token, title)
  if (new_role_id === 68) action = troublemakerAction(gamestate, token, title)
  if (new_role_id === 69) action = temptressAction(gamestate, token, title)
  if (new_role_id === 70) action = witchAction(gamestate, token, title)
  if (new_role_id === 85) action = thingAction(gamestate, token, title)

  return action
}
