import { generateRoleAction, getCardIdsByPositions, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const insomniacAction = (gamestate, token, title) => {
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]
  const currentCard = gamestate.positions.card_positions[currentPlayerNumber].card

  if (!gamestate.players[token].shield) {
    gamestate.players[token].card.player_card_id = currentCard.id
    gamestate.players[token].card.player_team = currentCard.team

    const showCards = getCardIdsByPositions(gamestate.positions.card_positions, [currentPlayerNumber])

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      viewed_cards: [currentPlayerNumber]
    }

    return generateRoleAction(gamestate, token, {
      private_message: ['action_own_card'],
      showCards,
      scene_end: true
    })
  } else {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      shielded: true
    }

    return generateRoleAction(gamestate, token, {
      private_message: ['action_shielded'],
      scene_end: true
    })
  }
}
