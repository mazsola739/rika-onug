import {
  alphawolfInteraction,
  apprenticeseerInteraction,
  cupidInteraction,
  diseasedInteraction,
  drunkInteraction,
  instigatorInteraction,
  mysticwolfInteraction,
  paranormalinvestigatorInteraction,
  robberInteraction,
  seerInteraction,
  sentinelInteraction,
  temptressInteraction,
  thingInteraction,
  troublemakerInteraction,
  villageidiotInteraction,
  witchInteraction
} from '..'
import { DOPPELGANGER_INSTANT_ACTION } from '../../../constants'
import { generateRoleAction } from '../../sceneUtils'

export const doppelgangerinstantactionInteraction = (gamestate, token, title) => {
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

  if (new_role_id === 2) action = drunkInteraction(gamestate, token, title)
  if (new_role_id === 8) action = robberInteraction(gamestate, token, title)
  if (new_role_id === 9) action = seerInteraction(gamestate, token, title)
  if (new_role_id === 11) action = troublemakerInteraction(gamestate, token, title)
  if (new_role_id === 17) action = alphawolfInteraction(gamestate, token, title)
  if (new_role_id === 18) action = apprenticeseerInteraction(gamestate, token, title)
  if (new_role_id === 22) action = mysticwolfInteraction(gamestate, token, title)
  if (new_role_id === 23) action = paranormalinvestigatorInteraction(gamestate, token, title)
  if (new_role_id === 25) action = sentinelInteraction(gamestate, token, title)
  if (new_role_id === 26) action = villageidiotInteraction(gamestate, token, title)
  if (new_role_id === 27) action = witchInteraction(gamestate, token, title)
  if (new_role_id === 31) action = cupidInteraction(gamestate, token, title)
  if (new_role_id === 32) action = diseasedInteraction(gamestate, token, title)
  if (new_role_id === 34) action = instigatorInteraction(gamestate, token, title)
  if (new_role_id === 55) action = thingInteraction(gamestate, token, title)
  if (new_role_id === 56) action = seerInteraction(gamestate, token, title)
  if (new_role_id === 57) action = mysticwolfInteraction(gamestate, token, title)
  if (new_role_id === 65) action = apprenticeseerInteraction(gamestate, token, title)
  if (new_role_id === 66) action = robberInteraction(gamestate, token, title)
  if (new_role_id === 68) action = troublemakerInteraction(gamestate, token, title)
  if (new_role_id === 69) action = temptressInteraction(gamestate, token, title)
  if (new_role_id === 70) action = witchInteraction(gamestate, token, title)
  if (new_role_id === 85) action = thingInteraction(gamestate, token, title)

  return action
}

/**
 * * Doppelgänger instant night actions:
 * ? 2 Drunk, 8 Robber, 9 Seer , 11 Troublemaker, 17 Alpha wolf, 18 Apprenticeseer, 22 Mystic wolf,
 * ? 23 Paranormal investigator, 25 Sentinel, 26 Village idiot, 27 Witch, 31 Cupid, 32 Diseased,
 * ? 34 Instigator, 55 Annoyinglad, 56 Detector, 57 Dr peeker, 65 Rapscallion, 66 Role retriever,
 * ? 68 Switcheroo, 69 Temptress, 70 Voodoolou, 85 Thing
 * */
