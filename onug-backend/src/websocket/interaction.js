import { logDebug, logError } from '../log'
import { readGamestate, upsertRoomState } from '../repository'
import { aliens_response, alphawolf_response, thing_response, apprenticeseer_response, apprenticeassassin_response, assassin_response, beholder_response, bodysnatcher_response, copycat_response, curator_response, cupid_response, seer_response, diseased_response, doppelganger_response, doppelganger_instant_action_response, empath_response, exposer_response, revealer_response, gremlin_response, mortician_response, pickpocket_response, priest_response, psychic_response, rascal_response, thecount_response, mysticwolf_response, drunk_response, instigator_response, marksman_response, nostradamus_response, oracle_question_response, oracle_answer_response, paranormalinvestigator_response, robber_response, sentinel_response, squire_response, troublemaker_response, temptress_response, vampires_response, villageidiot_response, witch_response, werewolves_response } from '../scenes/roles'
import { webSocketServerConnectionsPerRoom } from './connections'


export const interaction = async (ws, message) => {
  try {
    logDebug(`Interaction requested with ${JSON.stringify(message)}`)

    const { room_id, token, selected_card_positions, selected_mark_positions, selected_answer } = message
    const gamestate = await readGamestate(room_id)
    // TODO validate client request

    const newGamestate = generateInteractionResponse(gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, ws)

    newGamestate?.scene.forEach((item) => {
      webSocketServerConnectionsPerRoom[newGamestate.room_id][item.token].send(JSON.stringify(item))
    })

    await upsertRoomState(newGamestate)
  } catch (error) {
    logError(error)
    logError(JSON.stringify(error?.stack))
  }
}

export const generateInteractionResponse = (gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, ws) => {
  const scene_title = gamestate.actual_scene.scene_title

  let newGamestate = { ...gamestate }

  switch (scene_title) {
    case "ALIENS":
      newGamestate = aliens_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "ALPHA_WOLF":
      newGamestate = alphawolf_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "ANNOYING_LAD":
      newGamestate = thing_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "APPRENTICE_SEER":
      newGamestate = apprenticeseer_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "APPRENTICE_ASSASSIN":
      newGamestate = apprenticeassassin_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "ASSASSIN":
      newGamestate = assassin_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "BEHOLDER":
      newGamestate = beholder_response(gamestate, token, selected_answer, scene_title)
      break
    case "BODY_SNATCHER":
      newGamestate = bodysnatcher_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "COPYCAT":
      newGamestate = copycat_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "CURATOR":
      newGamestate = curator_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "CUPID":
      newGamestate = cupid_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DETECTOR":
      newGamestate = seer_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "DISEASED":
      newGamestate = diseased_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DOPPELGÄNGER":
      newGamestate = doppelganger_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_INSTANT_ACTION":
      newGamestate = doppelganger_instant_action_response(gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, scene_title)
      break
    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN":
      newGamestate = apprenticeassassin_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DOPPELGÄNGER_ASSASSIN":
      newGamestate = assassin_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DOPPELGÄNGER_BODY_SNATCHER":
      newGamestate = bodysnatcher_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_CURATOR":
      newGamestate = curator_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_EMPATH":
      newGamestate = empath_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_EXPOSER":
      newGamestate = exposer_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_FLIPPER":
      newGamestate = revealer_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_GREMLIN":
      newGamestate = gremlin_response(gamestate, token, selected_card_positions, selected_mark_positions, scene_title)
      break
    case "DOPPELGÄNGER_MORTICIAN":
      newGamestate = mortician_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_PICKPOCKET":
      newGamestate = pickpocket_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DOPPELGÄNGER_PRIEST":
      newGamestate = priest_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DOPPELGÄNGER_PSYCHIC":
      newGamestate = psychic_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_RASCAL":
      newGamestate = rascal_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_REVEALER":
      newGamestate = revealer_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_THE_COUNT":
      newGamestate = thecount_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DR_PEEKER":
      newGamestate = mysticwolf_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "DRUNK":
      newGamestate = drunk_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "EMPATH":
      newGamestate = empath_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "EXPOSER":
      newGamestate = exposer_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "FLIPPER":
      newGamestate = revealer_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "GREMLIN":
      newGamestate = gremlin_response(gamestate, token, selected_card_positions, selected_mark_positions, scene_title)
      break
    case "INSTIGATOR":
      newGamestate = instigator_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "MARKSMAN":
      newGamestate = marksman_response(gamestate, token, selected_card_positions, selected_mark_positions, scene_title)
      break
    case "MIRROR_MAN":
      newGamestate = copycat_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "MORTICIAN":
      newGamestate = mortician_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "MYSTIC_WOLF":
      newGamestate = mysticwolf_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "NOSTRADAMUS":
      newGamestate = nostradamus_response(gamestate, token, selected_card_positions, scene_title)
      break  
    case "ORACLE_QUESTION":
      newGamestate = oracle_question_response(gamestate, token, selected_answer, scene_title)
      break
    case "ORACLE_ANSWER":
      newGamestate = oracle_answer_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "PARANORMAL_INVESTIGATOR":
      newGamestate = paranormalinvestigator_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "PICKPOCKET":
      newGamestate = pickpocket_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "PRIEST":
      newGamestate = priest_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "PSYCHIC":
      newGamestate = psychic_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "RAPSCALLION":
      newGamestate = apprenticeseer_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "RASCAL":
      newGamestate = rascal_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "REVEALER":
      newGamestate = revealer_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "ROBBER":
      newGamestate = robber_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "ROLE_RETRIEVER":
      newGamestate = robber_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "SEER":
      newGamestate = seer_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "SENTINEL":
      newGamestate = sentinel_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "SQUIRE":
      newGamestate = squire_response(gamestate, token, selected_answer, scene_title)
      break
    case "SWITCHEROO":
      newGamestate = troublemaker_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "TEMPTRESS":
      newGamestate = temptress_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "THE_COUNT":
      newGamestate = thecount_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "THING":
      newGamestate = thing_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "TROUBLEMAKER":
      newGamestate = troublemaker_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "VAMPIRES":
      newGamestate = vampires_response(gamestate, token, selected_mark_positions, scene_title)
      break
    case "VILLAGE_IDIOT":
      newGamestate = villageidiot_response(gamestate, token, selected_answer, scene_title)
      break
    case "VOODOO_LOU":
      newGamestate = witch_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "WITCH":
      newGamestate = witch_response(gamestate, token, selected_card_positions, scene_title)
      break
    case "WEREWOLVES":
      newGamestate = werewolves_response(gamestate, token, selected_card_positions, scene_title)
      break
    default:

      break
  }

  return newGamestate
}

