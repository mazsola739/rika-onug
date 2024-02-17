const { getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("./utils");

exports.updatePlayerCard = (newGameState, token) => {
    const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token]);
    const player = newGameState.players[token];
    const flippedCards = newGameState.flipped;
  
    const playerCard = player?.card;
    const currentCard = newGameState.card_positions[currentPlayerNumber[0]];
  
    if (!playerCard || !currentCard) return;
  
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, currentPlayerNumber);
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, currentPlayerNumber);
  
    if (iSeeMyCardIsFlipped) {
      playerCard.id = currentCard.id;
      playerCard.role_id = currentCard.id;
      playerCard.role = currentCard.role;
      playerCard.team = currentCard.team;
    } else if (iSeeMyCardElsewhere) {
      playerCard.id = 0;
    }
  };