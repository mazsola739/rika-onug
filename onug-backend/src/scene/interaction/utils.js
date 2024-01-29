exports.getPlayerCardIds = players => {
  const result = [];
  for (const token in players) {
    const player = players[token];
    result.push({ [player]: player.card.id });
  }
  return result;
};

exports.getPlayerRoleIds = players => {
  const result = [];
  for (const token in players) {
    const player = players[token];
    result.push({ [player]: player.card.role_id });
  }
  return result;
};

exports.findPlayersByCardIds = (players, cardIds) => {
  const result = [];
  for (const token in players) {
    if (players.hasOwnProperty(token)) {
      const player = players[token];
      if (cardIds.includes(player.card.id)) {
        result.push(token);
      }
    }
  }
  return result;
};

exports.findPlayersByRoleIds = (players, roleIds) => {
  const result = [];
  for (const token in players) {
    if (players.hasOwnProperty(token)) {
      const player = players[token];
      if (roleIds.includes(player.card.role_id)) {
        result.push(token);
      }
    }
  }
  return result;
};

exports.getPlayerNumbersByTokens = (players, tokens) =>
  tokens.map((token) => players[token].player_number);

exports.getCardIdsByPlayerNumbers = (cardPositions, playerNumbers) => {
  const result = [];
  playerNumbers.forEach((number) => {
    const key = `player_${number}`;
    const cardId = cardPositions[key].id;
    result.push({ [key]: cardId });
  });
  return result;
};

exports.getRolePositions = (playerNumbers, roleId) => {
  return playerNumbers.map((number) => ({ [`player_${number}`]: roleId }));
};

exports.getCardIdsByPositions = (cardPositions, selectedPositions) => {
  const result = [];
  selectedPositions.forEach((position) => {
    const cardId = cardPositions[position].id;
    result.push({ [position]: cardId });
  });
  return result;
 }
