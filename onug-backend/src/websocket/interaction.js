import { logDebug, logError } from "../log"
import { readGamestate, upsertRoomState } from "../repository"
import { aliensResponse, alphawolfResponse, thingResponse, apprenticeseerResponse, apprenticeassassinResponse, assassinResponse, beholderResponse, bodysnatcherResponse, copycatResponse, curatorResponse, cupidResponse, seerResponse, diseasedResponse, doppelgangerResponse, doppelgangerinstantactionResponse, empathResponse, exposerResponse, revealerResponse, gremlinResponse, morticianResponse, pickpocketResponse, priestResponse, psychicResponse, rascalResponse, thecountResponse, mysticwolfResponse, drunkResponse, instigatorResponse, marksmanResponse, nostradamusResponse, oracle_questionResponse, oracle_answerResponse, paranormalinvestigatorResponse, robberResponse, sentinelResponse, squireResponse, troublemakerResponse, temptressResponse, vampiresResponse, villageidiotResponse, witchResponse, werewolvesResponse } from "../scenes/roles"
import { webSocketServerConnectionsPerRoom } from "./connections"

export const interaction = async (message) => {
  try {
    logDebug(`Interaction requested with ${JSON.stringify(message)}`)

    const { room_id, token, selected_card_positions, selected_mark_positions, selected_answer } = message
    const gamestate = await readGamestate(room_id)
    // TODO validate client request

    const newGamestate = generateInteractionResponse(gamestate, token, selected_card_positions, selected_mark_positions, selected_answer)

    newGamestate?.scene.forEach((item) => {
      webSocketServerConnectionsPerRoom[newGamestate.room_id][item.token].send(JSON.stringify(item))
    })

    await upsertRoomState(newGamestate)
  } catch (error) {
    logError(error)
    logError(JSON.stringify(error?.stack))
  }
}

export const generateInteractionResponse = (gamestate, token, selected_card_positions, selected_mark_positions, selected_answer) => {
  const scene_title = gamestate.actual_scene.scene_title

  let newGamestate = { ...gamestate }

  switch (scene_title) {
    case "ALIENS":
      newGamestate = aliensResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "ALPHA_WOLF":
      newGamestate = alphawolfResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "ANNOYING_LAD":
      newGamestate = thingResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "APPRENTICE_SEER":
      newGamestate = apprenticeseerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "APPRENTICE_ASSASSIN":
      newGamestate = apprenticeassassinResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "ASSASSIN":
      newGamestate = assassinResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "BEHOLDER":
      newGamestate = beholderResponse(gamestate, token, selected_answer, scene_title)
      break
    case "BODY_SNATCHER":
      newGamestate = bodysnatcherResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "COPYCAT":
      newGamestate = copycatResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "CURATOR":
      newGamestate = curatorResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "CUPID":
      newGamestate = cupidResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DETECTOR":
      newGamestate = seerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "DISEASED":
      newGamestate = diseasedResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DOPPELGÄNGER":
      newGamestate = doppelgangerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_INSTANT_ACTION":
      newGamestate = doppelgangerinstantactionResponse(gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, scene_title)
      break
    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN":
      newGamestate = apprenticeassassinResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DOPPELGÄNGER_ASSASSIN":
      newGamestate = assassinResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DOPPELGÄNGER_BODY_SNATCHER":
      newGamestate = bodysnatcherResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_CURATOR":
      newGamestate = curatorResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_EMPATH":
      newGamestate = empathResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_EXPOSER":
      newGamestate = exposerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_FLIPPER":
      newGamestate = revealerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_GREMLIN":
      newGamestate = gremlinResponse(gamestate, token, selected_card_positions, selected_mark_positions, scene_title)
      break
    case "DOPPELGÄNGER_MORTICIAN":
      newGamestate = morticianResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_PICKPOCKET":
      newGamestate = pickpocketResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DOPPELGÄNGER_PRIEST":
      newGamestate = priestResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DOPPELGÄNGER_PSYCHIC":
      newGamestate = psychicResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_RASCAL":
      newGamestate = rascalResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_REVEALER":
      newGamestate = revealerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "DOPPELGÄNGER_THE_COUNT":
      newGamestate = thecountResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "DR_PEEKER":
      newGamestate = mysticwolfResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "DRUNK":
      newGamestate = drunkResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "EMPATH":
      newGamestate = empathResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "EXPOSER":
      newGamestate = exposerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "FLIPPER":
      newGamestate = revealerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "GREMLIN":
      newGamestate = gremlinResponse(gamestate, token, selected_card_positions, selected_mark_positions, scene_title)
      break
    case "INSTIGATOR":
      newGamestate = instigatorResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "MARKSMAN":
      newGamestate = marksmanResponse(gamestate, token, selected_card_positions, selected_mark_positions, scene_title)
      break
    case "MIRROR_MAN":
      newGamestate = copycatResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "MORTICIAN":
      newGamestate = morticianResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "MYSTIC_WOLF":
      newGamestate = mysticwolfResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "NOSTRADAMUS":
      newGamestate = nostradamusResponse(gamestate, token, selected_card_positions, scene_title)
      break  
    case "ORACLE_QUESTION":
      newGamestate = oracle_questionResponse(gamestate, token, selected_answer, scene_title)
      break
    case "ORACLE_ANSWER":
      newGamestate = oracle_answerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "PARANORMAL_INVESTIGATOR":
      newGamestate = paranormalinvestigatorResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "PICKPOCKET":
      newGamestate = pickpocketResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "PRIEST":
      newGamestate = priestResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "PSYCHIC":
      newGamestate = psychicResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "RAPSCALLION":
      newGamestate = apprenticeseerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "RASCAL":
      newGamestate = rascalResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "REVEALER":
      newGamestate = revealerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "ROBBER":
      newGamestate = robberResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "ROLE_RETRIEVER":
      newGamestate = robberResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "SEER":
      newGamestate = seerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "SENTINEL":
      newGamestate = sentinelResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "SQUIRE":
      newGamestate = squireResponse(gamestate, token, selected_answer, scene_title)
      break
    case "SWITCHEROO":
      newGamestate = troublemakerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "TEMPTRESS":
      newGamestate = temptressResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "THE_COUNT":
      newGamestate = thecountResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "THING":
      newGamestate = thingResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "TROUBLEMAKER":
      newGamestate = troublemakerResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "VAMPIRES":
      newGamestate = vampiresResponse(gamestate, token, selected_mark_positions, scene_title)
      break
    case "VILLAGE_IDIOT":
      newGamestate = villageidiotResponse(gamestate, token, selected_answer, scene_title)
      break
    case "VOODOO_LOU":
      newGamestate = witchResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "WITCH":
      newGamestate = witchResponse(gamestate, token, selected_card_positions, scene_title)
      break
    case "WEREWOLVES":
      newGamestate = werewolvesResponse(gamestate, token, selected_card_positions, scene_title)
      break
    default:

      break
  }

  return newGamestate
}

