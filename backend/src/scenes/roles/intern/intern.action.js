import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions, updatePlayerKnownCard } from '../../sceneUtils'

export const internAction = (gamestate, token, title) => {
  const madscientist = getPlayerNumbersByGivenConditions(gamestate.players, 'madscientist', gamestate.positions.shielded_cards)

  if (madscientist.length === 0) {
    const { player_card_id, player_role } = gamestate.players[token].card
    updatePlayerKnownCard(gamestate, token, player_card_id, player_role, 63, 'MAD_SCIENTIST')
  }

  const messageIdentifiers = formatPlayerIdentifier(madscientist)

  return generateRoleAction(gamestate, token, title, {
    private_message: [madscientist.length === 0 ? 'action_mad_now' : 'action_mad', ...messageIdentifiers, 'POINT'],
    uniqueInformation: { madscientist },
    scene_end: true
  })
}
