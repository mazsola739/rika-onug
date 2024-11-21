import { logInfo, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import * as roles from './roles'

export const responseHandler = async (gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, scene_title) => {
  logTrace(`responseHandler in room [${gamestate.room_id}] called when actual scene is: ${scene_title}`)

  let newGamestate = { ...gamestate }

  switch (scene_title) {
    case 'ALIENS':
      newGamestate = roles.aliensResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'ALPHA_WOLF':
      newGamestate = roles.alphawolfResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'ANNOYING_LAD':
      newGamestate = roles.thingResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'APPRENTICE_SEER':
      newGamestate = roles.apprenticeseerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'APPRENTICE_ASSASSIN':
      newGamestate = roles.apprenticeassassinResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'ASSASSIN':
      newGamestate = roles.assassinResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'BEHOLDER':
      newGamestate = roles.beholderResponse(gamestate, token, selected_answer, scene_title)
      break
    case 'BODY_SNATCHER':
      newGamestate = roles.bodysnatcherResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'COPYCAT':
      newGamestate = roles.copycatResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'CURATOR':
      newGamestate = roles.curatorResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'CUPID':
      newGamestate = roles.cupidResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'DETECTOR':
      newGamestate = roles.seerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'DISEASED':
      newGamestate = roles.diseasedResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'DOPPELGÄNGER':
      newGamestate = roles.doppelgangerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'DOPPELGÄNGER_INSTANT_ACTION':
      newGamestate = roles.doppelgangerinstantactionResponse(gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, scene_title)
      break
    case 'DOPPELGÄNGER_APPRENTICE_ASSASSIN':
      newGamestate = roles.apprenticeassassinResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'DOPPELGÄNGER_ASSASSIN':
      newGamestate = roles.assassinResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'DOPPELGÄNGER_BODY_SNATCHER':
      newGamestate = roles.bodysnatcherResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'DOPPELGÄNGER_CURATOR':
      newGamestate = roles.curatorResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'DOPPELGÄNGER_EMPATH':
      newGamestate = roles.empathResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'DOPPELGÄNGER_EXPOSER':
      newGamestate = roles.exposerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'DOPPELGÄNGER_FLIPPER':
      newGamestate = roles.revealerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'DOPPELGÄNGER_GREMLIN':
      newGamestate = roles.gremlinResponse(gamestate, token, selected_card_positions, selected_mark_positions, scene_title)
      break
    case 'DOPPELGÄNGER_MORTICIAN':
      newGamestate = roles.morticianResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'DOPPELGÄNGER_PICKPOCKET':
      newGamestate = roles.pickpocketResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'DOPPELGÄNGER_PRIEST':
      newGamestate = roles.priestResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'DOPPELGÄNGER_PSYCHIC':
      newGamestate = roles.psychicResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'DOPPELGÄNGER_RASCAL':
      newGamestate = roles.rascalResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'DOPPELGÄNGER_REVEALER':
      newGamestate = roles.revealerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'DOPPELGÄNGER_THE_COUNT':
      newGamestate = roles.thecountResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'DR_PEEKER':
      newGamestate = roles.mysticwolfResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'DRUNK':
      newGamestate = roles.drunkResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'EMPATH':
      newGamestate = roles.empathResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'EXPOSER':
      newGamestate = roles.exposerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'FLIPPER':
      newGamestate = roles.revealerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'GREMLIN':
      newGamestate = roles.gremlinResponse(gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, scene_title)
      break
    case 'INSTIGATOR':
      newGamestate = roles.instigatorResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'MARKSMAN':
      newGamestate = roles.marksmanResponse(gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, scene_title)
      break
    case 'MIRROR_MAN':
      newGamestate = roles.copycatResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'MORTICIAN':
      newGamestate = roles.morticianResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'MYSTIC_WOLF':
      newGamestate = roles.mysticwolfResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'NOSTRADAMUS':
      newGamestate = roles.nostradamusResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'ORACLE_QUESTION':
      newGamestate = roles.oracleQuestionResponse(gamestate, token, selected_answer, scene_title)
      break
    case 'ORACLE_ANSWER':
      newGamestate = roles.oracleAnswerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'PARANORMAL_INVESTIGATOR':
      newGamestate = roles.paranormalinvestigatorResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'PICKPOCKET':
      newGamestate = roles.pickpocketResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'PRIEST':
      newGamestate = roles.priestResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'PSYCHIC':
      newGamestate = roles.psychicResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'RAPSCALLION':
      newGamestate = roles.apprenticeseerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'RASCAL':
      newGamestate = roles.rascalResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'REVEALER':
      newGamestate = roles.revealerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'ROBBER':
      newGamestate = roles.robberResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'ROLE_RETRIEVER':
      newGamestate = roles.robberResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'SEER':
      newGamestate = roles.seerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'SENTINEL':
      newGamestate = roles.sentinelResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'SQUIRE':
      newGamestate = roles.squireResponse(gamestate, token, selected_answer, scene_title)
      break
    case 'SWITCHEROO':
      newGamestate = roles.troublemakerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'TEMPTRESS':
      newGamestate = roles.temptressResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'THE_COUNT':
      newGamestate = roles.thecountResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'THING':
      newGamestate = roles.thingResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'TROUBLEMAKER':
      newGamestate = roles.troublemakerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'VAMPIRES':
      newGamestate = roles.vampiresResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case 'VILLAGE_IDIOT':
      newGamestate = roles.villageidiotResponse(gamestate, token, selected_answer, scene_title)
      break
    case 'VOODOO_LOU':
      newGamestate = roles.witchResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'WITCH':
      newGamestate = roles.witchResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case 'WEREWOLVES':
      newGamestate = roles.werewolvesResponse(gamestate, token, selected_card_positions, scene_title)
      break
    default:
      logInfo(`RESPONSE_HANDLER_DEFAULT case: no role found for: [response scene title: ${scene_title}]`)
  }

  await upsertRoomState(newGamestate)

  return newGamestate
}
