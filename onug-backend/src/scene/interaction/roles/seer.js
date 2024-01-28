const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.seer = () => {
  const playerCards = collectCardInfo(gameState.players);
  const seerPlayer = getPlayersByCardIds(playerCards, [9]);

  return seerPlayer;
};
