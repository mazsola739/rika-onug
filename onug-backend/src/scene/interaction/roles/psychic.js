const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger
exports.psychic = () => {
  const playerCards = collectCardInfo(gameState.players);
  const psychicPlayer = getPlayersByCardIds(playerCards, [51]);

  return psychicPlayer;
};
