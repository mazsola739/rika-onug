const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger
exports.gremlin = () => {
  const playerCards = collectCardInfo(gameState.players);
  const gremlinPlayer = getPlayersByCardIds(playerCards, [33]);

  return gremlinPlayer;
};
