exports.collectCardInfo = (players) => {
  const playerCardId = {};

  for (const playerId in players) {
    if (Object.hasOwnProperty.call(players, playerId)) {
      const player = players[playerId];
      const playerNumber = player.player_number;
      const cardId = player.card.id;

      playerCardId[playerNumber] = cardId;
    }
  }

  return playerCardId;
};


exports.findNonMatchingElements=(array1, array2)=> {
    const nonMatchingElements = [];

    for (const element of array1) {
      if (!array2.includes(element)) {
        nonMatchingElements.push(element);
      }
    }
  
    return nonMatchingElements;
  }