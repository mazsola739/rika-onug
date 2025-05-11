import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions, updatePlayerKnownCard } from '../../sceneUtils'

export const apprenticetannerAction = (gamestate, token, title) => {
  let tanner = getPlayerNumbersByGivenConditions(gamestate.players, 'tanner')

  const messageIdentifiers = formatPlayerIdentifier(tanner)
  let privateMessage = ['action_tanner', ...messageIdentifiers, 'POINT']

  if (tanner.length > 0) {
    gamestate.players[token].card.player_team = 'apprenticetanner'
  } else if (tanner.length === 0) {
    tanner = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)

    const { player_card_id, player_role_id } = gamestate.players[token].card
    updatePlayerKnownCard(gamestate, token, player_card_id, 'TANNER', player_role_id, 'tanner')
    
    privateMessage = ['action_tanner_now']
  }

  return generateRoleAction(gamestate, token, title, {
    private_message: privateMessage,
    uniqueInformation: { tanner },
    scene_end: true
  })
}
