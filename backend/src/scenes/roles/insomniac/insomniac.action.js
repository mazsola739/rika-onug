import { generateRoleAction, getCardIdsByPositions, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const insomniacAction = (gamestate, token, title) => {
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]
  const currentCard = gamestate.positions.card_positions[currentPlayerNumber].card

  if (!gamestate.players[token].shield) {
    gamestate.players[token].card.player_card_id = currentCard.id
    gamestate.players[token].card.player_team = currentCard.team

    const showCards = getCardIdsByPositions(gamestate.positions.card_positions, [currentPlayerNumber])
    return generateRoleAction(gamestate, token, title, {
      private_message: ['action_own_card'],
      showCards,
      uniqueInformation: { viewed_cards: [currentPlayerNumber] },
      scene_end: true
    })
  } else {
    return generateRoleAction(gamestate, token, title, {
      private_message: ['action_shielded'],
      uniqueInformation: { shielded: true },
      scene_end: true
    })
  }
}
