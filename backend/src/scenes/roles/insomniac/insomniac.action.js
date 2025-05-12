import { generateRoleAction, getCardIdsByPositions, getPlayerNumbersByGivenConditions, updatePlayerKnownCard } from '../../sceneUtils'

export const insomniacAction = (gamestate, token, title) => {
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]

  if (!gamestate.players[token].shield) {
    const showCards = getCardIdsByPositions(gamestate.positions.card_positions, [currentPlayerNumber])

    const { id, team } = gamestate.positions.card_positions[currentPlayerNumber].card
    const { player_role, player_role_id } = gamestate.players[token].card
    updatePlayerKnownCard(gamestate, token, id, player_role, player_role_id, team)

    return generateRoleAction(gamestate, token, title, {
      private_message: ['action_own_card'],
      showCards,
      scene_end: true
    })
  } else {
    return generateRoleAction(gamestate, token, title, {
      private_message: ['action_shielded'],
      scene_end: true
    })
  }
}
