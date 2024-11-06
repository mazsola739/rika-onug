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
  witchResponse,
} from '..'

export const doppelgangerinstantactionResponse = (
  gamestate,
  token,
  selected_card_positions,
  selected_mark_positions,
  selected_answer,
  title
) => {
  const new_role_id = gamestate.players[token]?.new_role_id
  let newGamestate = { ...gamestate }

  if (new_role_id === 2)
    newGamestate = drunkResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 8)
    newGamestate = robberResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 9)
    newGamestate = seerResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 11)
    newGamestate = troublemakerResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 17)
    newGamestate = alphawolfResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 18)
    newGamestate = apprenticeseerResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 22)
    newGamestate = mysticwolfResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 23)
    newGamestate = paranormalinvestigatorResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 25)
    newGamestate = sentinelResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 26)
    newGamestate = villageidiotResponse(
      gamestate,
      token,
      selected_answer,
      title
    )
  if (new_role_id === 27)
    newGamestate = witchResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 31)
    newGamestate = cupidResponse(
      gamestate,
      token,
      selected_mark_positions,
      title
    )
  if (new_role_id === 32)
    newGamestate = diseasedResponse(
      gamestate,
      token,
      selected_mark_positions,
      title
    )
  if (new_role_id === 34)
    newGamestate = instigatorResponse(
      gamestate,
      token,
      selected_mark_positions,
      title
    )
  if (new_role_id === 55)
    newGamestate = thingResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 56)
    newGamestate = seerResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 57)
    newGamestate = mysticwolfResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 65)
    newGamestate = apprenticeseerResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 66)
    newGamestate = robberResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 68)
    newGamestate = troublemakerResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 69)
    newGamestate = temptressResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 70)
    newGamestate = witchResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )
  if (new_role_id === 85)
    newGamestate = thingResponse(
      gamestate,
      token,
      selected_card_positions,
      title
    )

  return newGamestate
}
