const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger
exports.exposer = () => {
  const playerCards = collectCardInfo(gameState.players);
  const exposerPlayer = getPlayersByCardIds(playerCards, [46]);

  return exposerPlayer;
};
