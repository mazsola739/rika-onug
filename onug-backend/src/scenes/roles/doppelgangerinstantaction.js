import { SCENE, DOPPELGANGER_INSTANT_ACTION_IDS } from '../../constants'
import { getAllPlayerTokens, getSceneEndTime } from '../../utils'
import { alphawolf_interaction, alphawolf_response } from './alphawolf'
import { apprenticeseer_interaction, apprenticeseer_response } from './apprenticeseer'
import { cupid_interaction, cupid_response } from './cupid'
import { diseased_interaction, diseased_response } from './diseased'
import { drunk_interaction, drunk_response } from './drunk'
import { instigator_interaction, instigator_response } from './instigator'
import { mysticwolf_interaction, mysticwolf_response } from './mysticwolf'
import { paranormalinvestigator_interaction, paranormalinvestigator_response } from './paranormalinvestigator'
import { robber_interaction, robber_response } from './robber'
import { seer_interaction, seer_response } from './seer'
import { sentinel_interaction, sentinel_response } from './sentinel'
import { temptress_interaction, temptress_response } from './temptress'
import { thing_interaction, thing_response } from './thing'
import { troublemaker_interaction, troublemaker_response } from './troublemaker'
import { villageidiot_interaction, villageidiot_response } from './villageidiot'
import { witch_interaction, witch_response } from './witch'

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
      interaction = doppelganger_instant_action_interaction(newGamestate, token, title)
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

export const doppelganger_instant_action_interaction = (gamestate, token, title) => {
  const new_role_id = gamestate.players[token]?.new_role_id

  if (!DOPPELGANGER_INSTANT_ACTION_IDS.includes(new_role_id)) {}

  let interaction = {}

  if (new_role_id === 2)  interaction = drunk_interaction(gamestate, token, title)
  if (new_role_id === 8)  interaction = robber_interaction(gamestate, token, title)
  if (new_role_id === 9)  interaction = seer_interaction(gamestate, token, title)
  if (new_role_id === 11) interaction = troublemaker_interaction(gamestate, token, title)
  if (new_role_id === 17) interaction = alphawolf_interaction(gamestate, token, title)
  if (new_role_id === 18) interaction = apprenticeseer_interaction(gamestate, token, title)
  if (new_role_id === 22) interaction = mysticwolf_interaction(gamestate, token, title)
  if (new_role_id === 23) interaction = paranormalinvestigator_interaction(gamestate, token, title)
  if (new_role_id === 25) interaction = sentinel_interaction(gamestate, token, title)
  if (new_role_id === 26) interaction = villageidiot_interaction(gamestate, token, title)
  if (new_role_id === 27) interaction = witch_interaction(gamestate, token, title)
  if (new_role_id === 31) interaction = cupid_interaction(gamestate, token, title)
  if (new_role_id === 32) interaction = diseased_interaction(gamestate, token, title)
  if (new_role_id === 34) interaction = instigator_interaction(gamestate, token, title)
  if (new_role_id === 55) interaction = thing_interaction(gamestate, token, title)
  if (new_role_id === 56) interaction = seer_interaction(gamestate, token, title)
  if (new_role_id === 57) interaction = mysticwolf_interaction(gamestate, token, title)
  if (new_role_id === 65) interaction = apprenticeseer_interaction(gamestate, token, title)
  if (new_role_id === 66) interaction = robber_interaction(gamestate, token, title)
  if (new_role_id === 68) interaction = troublemaker_interaction(gamestate, token, title)
  if (new_role_id === 69) interaction = temptress_interaction(gamestate, token, title)
  if (new_role_id === 70) interaction = witch_interaction(gamestate, token, title)
  if (new_role_id === 85) interaction = thing_interaction(gamestate, token, title)

  return interaction
}

export const doppelganger_instant_action_response =  (gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title) => {
  const new_role_id = gamestate.players[token]?.new_role_id
  let newGamestate = {...gamestate}

  if (new_role_id === 2)  newGamestate = drunk_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 8)  newGamestate = robber_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 9)  newGamestate = seer_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 11) newGamestate = troublemaker_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 17) newGamestate = alphawolf_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 18) newGamestate = apprenticeseer_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 22) newGamestate = mysticwolf_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 23) newGamestate = paranormalinvestigator_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 25) newGamestate = sentinel_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 26) newGamestate = villageidiot_response(gamestate, token, selected_answer, title)
  if (new_role_id === 27) newGamestate = witch_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 31) newGamestate = cupid_response(gamestate, token, selected_mark_positions, title)
  if (new_role_id === 32) newGamestate = diseased_response(gamestate, token, selected_mark_positions, title)
  if (new_role_id === 34) newGamestate = instigator_response(gamestate, token, selected_mark_positions, title)
  if (new_role_id === 55) newGamestate = thing_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 56) newGamestate = seer_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 57) newGamestate = mysticwolf_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 65) newGamestate = apprenticeseer_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 66) newGamestate = robber_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 68) newGamestate = troublemaker_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 69) newGamestate = temptress_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 70) newGamestate = witch_response(gamestate, token, selected_card_positions, title)
  if (new_role_id === 85) newGamestate = thing_response(gamestate, token, selected_card_positions, title)

  return newGamestate
}
