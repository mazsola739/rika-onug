const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.detector = () => {
  const playerCards = collectCardInfo(gameState.players);
  const detectorPlayer = getPlayersByCardIds(playerCards, [56]);

  return detectorPlayer;
};
