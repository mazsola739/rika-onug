import { SCENE, DOPPELGANGER_INSTANT_ACTION_IDS } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime } from '../../../utils'
import { alphawolfInteraction, alphawolfResponse } from '..'
import { apprenticeseerInteraction, apprenticeseerResponse } from '..'
import { cupidInteraction, cupidResponse } from '..'
import { diseasedInteraction, diseasedResponse } from '..'
import { drunkInteraction, drunkResponse } from '..'
import { instigatorInteraction, instigatorResponse } from '..'
import { mysticwolfInteraction, mysticwolfResponse } from '..'
import { paranormalinvestigatorInteraction, paranormalinvestigatorResponse } from '..'
import { robberInteraction, robberResponse } from '..'
import { seerInteraction, seerResponse } from '..'
import { sentinelInteraction, sentinelResponse } from '..'
import { temptressInteraction, temptressResponse } from '..'
import { thingInteraction, thingResponse } from '..'
import { troublemakerInteraction, troublemakerResponse } from '..'
import { villageidiotInteraction, villageidiotResponse } from '..'
import { witchInteraction, witchResponse } from '..'

const instantRoleIds = {
  17: 'role_alphawolf',
  55: 'role_annoyinglad',
  18: 'role_apprenticeseer',
  31: 'role_cupid',
  56: 'role_detector',
  32: 'role_diseased',
  57: 'role_drpeeker',
  2:  'role_drunk',
  34: 'role_instigator',
  22: 'role_mysticwolf',
  23: 'role_paranormalinvestigator',
  65: 'role_rapscallion',
  8:  'role_robber',
  66: 'role_roleretriever',
  25: 'role_sentinel',
  9:  'role_seer',
  68: 'role_switcheroo',
  69: 'role_temptress',
  85: 'role_thing',
  11: 'role_troublemaker',
  26: 'role_villageidiot',
  70: 'role_voodoolou',
  27: 'role_witch',
}

const getRolesNames = (selectedCardIds, actionIds, roles) =>
  selectedCardIds.filter((id) => actionIds.includes(id)).map((id) => roles[id])

const addVerboseOr = (rolesFromIds) => {
  if (rolesFromIds.length > 1) {
    rolesFromIds.splice(rolesFromIds.length - 1, 0, 'doppelganger_verbose_or_text')
  }
  rolesFromIds
}

export const doppelganger_instant_action = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)  
  const rolesFromIds = getRolesNames(newGamestate.selected_cards, DOPPELGANGER_INSTANT_ACTION_IDS, instantRoleIds)
  const actionTime = 8

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
      interaction = doppelganger_instant_actionInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

/**
 * * Doppelgänger instant night actions:
 * ? 2 Drunk, 8 Robber, 9 Seer , 11 Troublemaker, 17 Alpha wolf, 18 Apprenticeseer, 22 Mystic wolf,
 * ? 23 Paranormal investigator, 25 Sentinel, 26 Village idiot, 27 Witch, 31 Cupid, 32 Diseased,
 * ? 34 Instigator, 55 Annoyinglad, 56 Detector, 57 Dr peeker, 65 Rapscallion, 66 Role retriever,
 * ? 68 Switcheroo, 69 Temptress, 70 Voodoolou, 85 Thing
 * */

export const doppelganger_instant_actionInteraction = (gamestate, token, title) => {
  const new_role_id = gamestate.players[token]?.new_role_id

  if (!DOPPELGANGER_INSTANT_ACTION_IDS.includes(new_role_id)) {}

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

export const doppelganger_instant_actionResponse =  (gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title) => {
  const new_role_id = gamestate.players[token]?.new_role_id
  let newGamestate = {...gamestate}

  if (new_role_id === 2)  newGamestate = drunkResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 8)  newGamestate = robberResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 9)  newGamestate = seerResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 11) newGamestate = troublemakerResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 17) newGamestate = alphawolfResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 18) newGamestate = apprenticeseerResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 22) newGamestate = mysticwolfResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 23) newGamestate = paranormalinvestigatorResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 25) newGamestate = sentinelResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 26) newGamestate = villageidiotResponse(gamestate, token, selected_answer, title)
  if (new_role_id === 27) newGamestate = witchResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 31) newGamestate = cupidResponse(gamestate, token, selected_mark_positions, title)
  if (new_role_id === 32) newGamestate = diseasedResponse(gamestate, token, selected_mark_positions, title)
  if (new_role_id === 34) newGamestate = instigatorResponse(gamestate, token, selected_mark_positions, title)
  if (new_role_id === 55) newGamestate = thingResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 56) newGamestate = seerResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 57) newGamestate = mysticwolfResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 65) newGamestate = apprenticeseerResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 66) newGamestate = robberResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 68) newGamestate = troublemakerResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 69) newGamestate = temptressResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 70) newGamestate = witchResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 85) newGamestate = thingResponse(gamestate, token, selected_card_positions, title)

  return newGamestate
}
