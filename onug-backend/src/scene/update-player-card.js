import {
  getPlayerNumbersWithMatchingTokens,
  isActivePlayersCardsFlipped,
  isPlayersCardsFlipped,
} from './utils';

export const updatePlayerCard = (gameState, token) => {
    const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(gameState.players, [token])
    const player = gameState.players[token]
    const flippedCards = gameState.flipped
  
    const playerCard = player?.card
    const currentCard = gameState.card_positions[currentPlayerNumber[0]]
  
    if (!playerCard || !currentCard) return
  
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, currentPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, currentPlayerNumber)
  
    if (iSeeMyCardIsFlipped) {
      playerCard.player_card_id = currentCard.id
      playerCard.player_role_id = currentCard.id
      playerCard.player_role = currentCard.role
      playerCard.player_team = currentCard.team
    } else if (iSeeMyCardElsewhere) {
      playerCard.player_card_id = 0
    }
  };