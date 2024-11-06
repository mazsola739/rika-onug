import {
  generateRoleInteraction,
  getCardIdsByPlayerNumbers,
  getPlayerNumberWithMatchingToken,
} from '../../sceneUtils'

export const insomniacInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(
    newGamestate.players,
    token
  )
  const currentCard = newGamestate.card_positions[currentPlayerNumber].card

  if (!newGamestate.players[token].shield) {
    newGamestate.players[token].card.player_card_id = currentCard.id
    newGamestate.players[token].card.player_team = currentCard.team

    const showCards = getCardIdsByPlayerNumbers(newGamestate.card_positions, [
      currentPlayerNumber,
    ])

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      viewed_cards: [currentPlayerNumber],
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_own_card'],
      showCards,
      scene_end: true,
    })
  } else {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      shielded: true,
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_shielded'],
      scene_end: true,
    })
  }
}
