import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions, updatePlayerKnownCard } from '../../sceneUtils'

export const apprenticetannerAction = (gamestate, token, title) => {
  let tanner = getPlayerNumbersByGivenConditions(gamestate, 'tanner')

  const messageIdentifiers = formatPlayerIdentifier(tanner)
  let private_message = ['action_tanner', ...messageIdentifiers, 'POINT']

  if (tanner.length > 0) {
    gamestate.players[token].card.player_team = 'apprenticetanner'
  } else if (tanner.length === 0) {
    tanner = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)

    const { player_card_id, player_role_id } = gamestate.players[token].card
    updatePlayerKnownCard(gamestate, token, player_card_id, 'TANNER', player_role_id, 'tanner')

    private_message = ['action_tanner_now']
  }

  return generateRoleAction(gamestate, token, title, {
    private_message,
    uniqueInformation: { tanner },
    scene_end: true
  })
}
