import { alphawolfResponse, apprenticeseerResponse, cupidResponse, diseasedResponse, drunkResponse, instigatorResponse, mysticwolfResponse, paranormalinvestigatorResponse, robberResponse, seerResponse, sentinelResponse, temptressResponse, thingResponse, troublemakerResponse, villageidiotResponse, witchResponse } from '..'

export const doppelgangerinstantactionResponse = (gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title) => {
  const new_role_id = gamestate.players[token]?.new_role_id

  const responseMap = {
    2: () => drunkResponse(gamestate,token,  selected_card_positions, title),
    8: () => robberResponse(gamestate,token,  selected_card_positions, title),
    9: () => seerResponse(gamestate,token,  selected_card_positions, title),
    11: () => troublemakerResponse(gamestate,token,  selected_card_positions, title),
    17: () => alphawolfResponse(gamestate,token,  selected_card_positions, title),
    18: () => apprenticeseerResponse(gamestate,token,  selected_card_positions, title),
    22: () => mysticwolfResponse(gamestate,token,  selected_card_positions, title),
    23: () => paranormalinvestigatorResponse(gamestate,token,  selected_card_positions, title),
    25: () => sentinelResponse(gamestate,token,  selected_card_positions, title),
    26: () => villageidiotResponse(gamestate,token,  selected_answer, title),
    27: () => witchResponse(gamestate,token,  selected_card_positions, title),
    31: () => cupidResponse(gamestate,token,  selected_mark_positions, title),
    32: () => diseasedResponse(gamestate,token,  selected_mark_positions, title),
    34: () => instigatorResponse(gamestate,token,  selected_mark_positions, title),
    55: () => thingResponse(gamestate,token,  selected_card_positions, title),
    56: () => seerResponse(gamestate,token,  selected_card_positions, title),
    57: () => mysticwolfResponse(gamestate,token,  selected_card_positions, title),
    65: () => apprenticeseerResponse(gamestate,token,  selected_card_positions, title),
    66: () => robberResponse(gamestate,token,  selected_card_positions, title),
    68: () => troublemakerResponse(gamestate,token,  selected_card_positions, title),
    69: () => temptressResponse(gamestate,token,  selected_card_positions, title),
    70: () => witchResponse(gamestate,token,  selected_card_positions, title),
    85: () => thingResponse(gamestate,token,  selected_card_positions, title)
  }

  const responseFunction = responseMap[new_role_id]
  if (responseFunction) gamestate = responseFunction()

  return gamestate
}
