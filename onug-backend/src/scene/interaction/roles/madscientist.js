const { collectCardInfo, getPlayersByCardIds } = require("../utils");

exports.madscientist = () => {
  const playerCards = collectCardInfo(gameState.players);
  const madscientistPlayer = getPlayersByCardIds(playerCards, [62]);

  return madscientistPlayer;
};
