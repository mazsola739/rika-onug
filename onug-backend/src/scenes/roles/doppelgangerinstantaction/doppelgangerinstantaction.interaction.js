import { alphawolfInteraction, apprenticeseerInteraction, cupidInteraction, diseasedInteraction, drunkInteraction, instigatorInteraction, mysticwolfInteraction, paranormalinvestigatorInteraction, robberInteraction, seerInteraction, sentinelInteraction, temptressInteraction, thingInteraction, troublemakerInteraction, villageidiotInteraction, witchInteraction } from '..'
import { IDS } from '../../../constants'

export const doppelgangerinstantactionInteraction = (gamestate, token, title) => {
  const new_role_id = gamestate.players[token]?.new_role_id

  if (!IDS.DOPPELGANGER_INSTANT_ACTION_IDS.includes(new_role_id)) return {}

  let interaction = {}

  if (new_role_id === 2)  interaction = drunkInteraction(gamestate, token, title)
  if (new_role_id === 8)  interaction = robberInteraction(gamestate, token, title)
  if (new_role_id === 9)  interaction = seerInteraction(gamestate, token, title)
  if (new_role_id === 11) interaction = troublemakerInteraction(gamestate, token, title)
  if (new_role_id === 17) interaction = alphawolfInteraction(gamestate, token, title)
  if (new_role_id === 18) interaction = apprenticeseerInteraction(gamestate, token, title)
  if (new_role_id === 22) interaction = mysticwolfInteraction(gamestate, token, title)
  if (new_role_id === 23) interaction = paranormalinvestigatorInteraction(gamestate, token, title)
  if (new_role_id === 25) interaction = sentinelInteraction(gamestate, token, title)
  if (new_role_id === 26) interaction = villageidiotInteraction(gamestate, token, title)
  if (new_role_id === 27) interaction = witchInteraction(gamestate, token, title)
  if (new_role_id === 31) interaction = cupidInteraction(gamestate, token, title)
  if (new_role_id === 32) interaction = diseasedInteraction(gamestate, token, title)
  if (new_role_id === 34) interaction = instigatorInteraction(gamestate, token, title)
  if (new_role_id === 55) interaction = thingInteraction(gamestate, token, title)
  if (new_role_id === 56) interaction = seerInteraction(gamestate, token, title)
  if (new_role_id === 57) interaction = mysticwolfInteraction(gamestate, token, title)
  if (new_role_id === 65) interaction = apprenticeseerInteraction(gamestate, token, title)
  if (new_role_id === 66) interaction = robberInteraction(gamestate, token, title)
  if (new_role_id === 68) interaction = troublemakerInteraction(gamestate, token, title)
  if (new_role_id === 69) interaction = temptressInteraction(gamestate, token, title)
  if (new_role_id === 70) interaction = witchInteraction(gamestate, token, title)
  if (new_role_id === 85) interaction = thingInteraction(gamestate, token, title)

  return interaction
}

/**
 * * Doppelgänger instant night actions:
 * ? 2 Drunk, 8 Robber, 9 Seer , 11 Troublemaker, 17 Alpha wolf, 18 Apprenticeseer, 22 Mystic wolf,
 * ? 23 Paranormal investigator, 25 Sentinel, 26 Village idiot, 27 Witch, 31 Cupid, 32 Diseased,
 * ? 34 Instigator, 55 Annoyinglad, 56 Detector, 57 Dr peeker, 65 Rapscallion, 66 Role retriever,
 * ? 68 Switcheroo, 69 Temptress, 70 Voodoolou, 85 Thing
 * */