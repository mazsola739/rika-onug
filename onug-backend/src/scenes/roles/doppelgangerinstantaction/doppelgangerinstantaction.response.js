import {
  alphawolfResponse,
  apprenticeseerResponse,
  cupidResponse,
  diseasedResponse,
  drunkResponse,
  instigatorResponse,
  mysticwolfResponse,
  paranormalinvestigatorResponse,
  robberResponse,
  seerResponse,
  sentinelResponse,
  temptressResponse,
  thingResponse,
  troublemakerResponse,
  villageidiotResponse,
  witchResponse
} from '..'

export const doppelgangerinstantactionResponse = (gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title) => {
  const new_role_id = gamestate.players[token]?.new_role_id

  if (new_role_id === 2) gamestate = drunkResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 8) gamestate = robberResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 9) gamestate = seerResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 11) gamestate = troublemakerResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 17) gamestate = alphawolfResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 18) gamestate = apprenticeseerResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 22) gamestate = mysticwolfResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 23) gamestate = paranormalinvestigatorResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 25) gamestate = sentinelResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 26) gamestate = villageidiotResponse(gamestate, token, selected_answer, title)
  if (new_role_id === 27) gamestate = witchResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 31) gamestate = cupidResponse(gamestate, token, selected_mark_positions, title)
  if (new_role_id === 32) gamestate = diseasedResponse(gamestate, token, selected_mark_positions, title)
  if (new_role_id === 34) gamestate = instigatorResponse(gamestate, token, selected_mark_positions, title)
  if (new_role_id === 55) gamestate = thingResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 56) gamestate = seerResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 57) gamestate = mysticwolfResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 65) gamestate = apprenticeseerResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 66) gamestate = robberResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 68) gamestate = troublemakerResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 69) gamestate = temptressResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 70) gamestate = witchResponse(gamestate, token, selected_card_positions, title)
  if (new_role_id === 85) gamestate = thingResponse(gamestate, token, selected_card_positions, title)

  return gamestate
}
