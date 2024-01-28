exports.collectCardInfo = (players) => {
  const playerCardId = {};

  for (const playerId in players) {
    if (Object.hasOwnProperty.call(players, playerId)) {
      const player = players[playerId];
      const playerNumber = player.player_number;
      const cardId = player.card.id;
      const roleCardId = player.card.role_id;

      playerCardId[`player_${playerNumber}_card`] = cardId;
    }
  }

  return playerCardId;
};

exports.findNonMatchingElements = (array1, array2) => {
  const nonMatchingElements = [];

  for (const element of array1) {
    if (!array2.includes(element)) {
      nonMatchingElements.push(element);
    }
  }

  return nonMatchingElements;
};

exports.getPlayersByRoleIds = (players, cardIds) => {
  const matchingPlayers = [];

  for (const playerId in players) {
    if (Object.hasOwnProperty.call(players, playerId)) {
      const roleId = players[playerId].card.id;
      if (cardIds.includes(roleId)) {
        matchingPlayers.push(playerId);
      }
    }
  }

  return matchingPlayers;
};

exports.getPlayersByCardIds = (players, cardIds) => {
  const matchingPlayers = [];

  for (const playerId in players) {
    if (Object.hasOwnProperty.call(players, playerId)) {
      const roleId = players[playerId].card.id;
      if (cardIds.includes(roleId)) {
        matchingPlayers.push(playerId);
      }
    }
  }

  return matchingPlayers;
};

exports.getPlayersWithMarkOfLove = (players) => {
  const matchingPlayers = [];

  for (const playerId in players) {
    if (Object.hasOwnProperty.call(players, playerId)) {
      const mark_id = players[playerId].card.mark_id;
      if (mark_id === "mark_of_love") {
        matchingPlayers.push(playerId);
      }
    }
  }

  return matchingPlayers;
};