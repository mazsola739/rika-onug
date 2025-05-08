import { logInfo, logTrace } from '../log'
import { repo, repositoryType } from '../repository'
import { aliensResponse, alphawolfResponse, thingResponse, apprenticeseerResponse, apprenticeassassinResponse, assassinResponse, beholderResponse, bodysnatcherResponse, copycatResponse, curatorResponse, cupidResponse, seerResponse, diseasedResponse, doppelgangerResponse, doppelgangerinstantactionResponse, empathResponse, exposerResponse, revealerResponse, gremlinResponse, morticianResponse, pickpocketResponse, priestResponse, psychicResponse, rascalResponse, thecountResponse, mysticwolfResponse, drunkResponse, instigatorResponse, marksmanResponse, nostradamusResponse, oraclequestionResponse, oracleanswerResponse, paranormalinvestigatorResponse, robberResponse, sentinelResponse, squireResponse, troublemakerResponse, temptressResponse, vampiresResponse, villageidiotResponse, witchResponse, werewolvesResponse } from './roles'

export const responseHandler = async (gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, scene_title, room_id) => {
  logTrace(`responseHandler in room [${room_id}] called when actual scene is: ${scene_title}`)

  let newGamestate = { ...gamestate }

  const roleResponseHandlers = {
    ALIENS: () => aliensResponse(gamestate, token, selected_card_positions, scene_title),
    ALPHA_WOLF: () => alphawolfResponse(gamestate, token, selected_card_positions, scene_title),
    ANNOYING_LAD: () => thingResponse(gamestate, token, selected_card_positions, scene_title),
    APPRENTICE_SEER: () => apprenticeseerResponse(gamestate, token, selected_card_positions, scene_title),
    APPRENTICE_ASSASSIN: () => apprenticeassassinResponse(gamestate, token, selected_mark_positions, scene_title),
    ASSASSIN: () => assassinResponse(gamestate, token, selected_mark_positions, scene_title),
    BEHOLDER: () => beholderResponse(gamestate, token, selected_answer, scene_title),
    BODY_SNATCHER: () => bodysnatcherResponse(gamestate, token, selected_card_positions, scene_title),
    COPYCAT: () => copycatResponse(gamestate, token, selected_card_positions, scene_title),
    CURATOR: () => curatorResponse(gamestate, token, selected_card_positions, scene_title),
    CUPID: () => cupidResponse(gamestate, token, selected_mark_positions, scene_title),
    DETECTOR: () => seerResponse(gamestate, token, selected_card_positions, scene_title),
    DISEASED: () => diseasedResponse(gamestate, token, selected_mark_positions, scene_title),
    DOPPELGANGER: () => doppelgangerResponse(gamestate, token, selected_card_positions, scene_title),
    DOPPELGANGER_INSTANT_ACTION: () => doppelgangerinstantactionResponse(gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, scene_title),
    DOPPELGANGER_APPRENTICE_ASSASSIN: () => apprenticeassassinResponse(gamestate, token, selected_mark_positions, scene_title),
    DOPPELGANGER_ASSASSIN: () => assassinResponse(gamestate, token, selected_mark_positions, scene_title),
    DOPPELGANGER_BODY_SNATCHER: () => bodysnatcherResponse(gamestate, token, selected_card_positions, scene_title),
    DOPPELGANGER_CURATOR: () => curatorResponse(gamestate, token, selected_card_positions, scene_title),
    DOPPELGANGER_EMPATH: () => empathResponse(gamestate, token, selected_card_positions, scene_title),
    DOPPELGANGER_EXPOSER: () => exposerResponse(gamestate, token, selected_card_positions, scene_title),
    DOPPELGANGER_FLIPPER: () => revealerResponse(gamestate, token, selected_card_positions, scene_title),
    DOPPELGANGER_GREMLIN: () => gremlinResponse(gamestate, token, selected_card_positions, selected_mark_positions, scene_title),
    DOPPELGANGER_MORTICIAN: () => morticianResponse(gamestate, token, selected_card_positions, scene_title),
    DOPPELGANGER_PICKPOCKET: () => pickpocketResponse(gamestate, token, selected_mark_positions, scene_title),
    DOPPELGANGER_PRIEST: () => priestResponse(gamestate, token, selected_mark_positions, scene_title),
    DOPPELGANGER_PSYCHIC: () => psychicResponse(gamestate, token, selected_card_positions, scene_title),
    DOPPELGANGER_RASCAL: () => rascalResponse(gamestate, token, selected_card_positions, selected_answer, scene_title),
    DOPPELGANGER_REVEALER: () => revealerResponse(gamestate, token, selected_card_positions, scene_title),
    DOPPELGANGER_THE_COUNT: () => thecountResponse(gamestate, token, selected_mark_positions, scene_title),
    DR_PEEKER: () => mysticwolfResponse(gamestate, token, selected_card_positions, scene_title),
    DRUNK: () => drunkResponse(gamestate, token, selected_card_positions, scene_title),
    EMPATH: () => empathResponse(gamestate, token, selected_card_positions, scene_title),
    EXPOSER: () => exposerResponse(gamestate, token, selected_card_positions, scene_title),
    FLIPPER: () => revealerResponse(gamestate, token, selected_card_positions, scene_title),
    GREMLIN: () => gremlinResponse(gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, scene_title),
    INSTIGATOR: () => instigatorResponse(gamestate, token, selected_mark_positions, scene_title),
    MARKSMAN: () => marksmanResponse(gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, scene_title),
    MIRROR_MAN: () => copycatResponse(gamestate, token, selected_card_positions, scene_title),
    MORTICIAN: () => morticianResponse(gamestate, token, selected_card_positions, scene_title),
    MYSTIC_WOLF: () => mysticwolfResponse(gamestate, token, selected_card_positions, scene_title),
    NOSTRADAMUS: () => nostradamusResponse(gamestate, token, selected_card_positions, scene_title),
    ORACLE_QUESTION: () => oraclequestionResponse(gamestate, token, selected_answer, scene_title),
    ORACLE_ANSWER: () => oracleanswerResponse(gamestate, token, selected_card_positions, scene_title),
    PARANORMAL_INVESTIGATOR: () => paranormalinvestigatorResponse(gamestate, token, selected_card_positions, scene_title),
    PICKPOCKET: () => pickpocketResponse(gamestate, token, selected_mark_positions, scene_title),
    PRIEST: () => priestResponse(gamestate, token, selected_mark_positions, scene_title),
    PSYCHIC: () => psychicResponse(gamestate, token, selected_card_positions, scene_title),
    RAPSCALLION: () => apprenticeseerResponse(gamestate, token, selected_card_positions, scene_title),
    RASCAL: () => rascalResponse(gamestate, token, selected_card_positions, selected_answer, scene_title),
    REVEALER: () => revealerResponse(gamestate, token, selected_card_positions, scene_title),
    ROBBER: () => robberResponse(gamestate, token, selected_card_positions, scene_title),
    ROLE_RETRIEVER: () => robberResponse(gamestate, token, selected_card_positions, scene_title),
    SEER: () => seerResponse(gamestate, token, selected_card_positions, scene_title),
    SENTINEL: () => sentinelResponse(gamestate, token, selected_card_positions, scene_title),
    SQUIRE: () => squireResponse(gamestate, token, selected_answer, scene_title),
    SWITCHEROO: () => troublemakerResponse(gamestate, token, selected_card_positions, scene_title),
    TEMPTRESS: () => temptressResponse(gamestate, token, selected_card_positions, scene_title),
    THE_COUNT: () => thecountResponse(gamestate, token, selected_mark_positions, scene_title),
    THING: () => thingResponse(gamestate, token, selected_card_positions, scene_title),
    TROUBLEMAKER: () => troublemakerResponse(gamestate, token, selected_card_positions, scene_title),
    VAMPIRES: () => vampiresResponse(gamestate, token, selected_mark_positions, scene_title),
    VILLAGE_IDIOT: () => villageidiotResponse(gamestate, token, selected_answer, scene_title),
    VOODOO_LOU: () => witchResponse(gamestate, token, selected_card_positions, scene_title),
    WITCH: () => witchResponse(gamestate, token, selected_card_positions, scene_title),
    WEREWOLVES: () => werewolvesResponse(gamestate, token, selected_card_positions, scene_title)
  }

  const defaultHandler = () => {
    logInfo(`RESPONSE_HANDLER_DEFAULT case: no role found for: [response scene title: ${scene_title}]`)
    return gamestate
  }

  newGamestate = (roleResponseHandlers[scene_title] || defaultHandler)()

  await repo[repositoryType].upsertRoomState(newGamestate)

  return newGamestate
}
