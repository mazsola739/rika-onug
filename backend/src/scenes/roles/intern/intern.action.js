import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const internAction = (gamestate, token, title) => {
  const madscientist = getPlayerNumbersByGivenConditions(gamestate.players, 'madscientist', gamestate.positions.shielded_cards)
  const playerCard = gamestate.players[token]?.card

  if (madscientist.length === 0) {
    playerCard.player_role_id = 63
    playerCard.player_role = 'MAD_SCIENTIST'
  }

  const messageIdentifiers = formatPlayerIdentifier(madscientist)

  return generateRoleAction(gamestate, token, title, {
    private_message: [madscientist.length === 0 ? 'action_mad_now' : 'action_mad', ...messageIdentifiers, 'POINT'],
    uniqueInformation: { madscientist },
    scene_end: true
  })
}
