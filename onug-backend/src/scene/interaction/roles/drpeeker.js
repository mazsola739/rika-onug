const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant
exports.drpeeker = () => {
  const playerCards = collectCardInfo(gameState.players);
  const drpeekerPlayer = getPlayersByCardIds(playerCards, [57]);

  return drpeekerPlayer;
};
