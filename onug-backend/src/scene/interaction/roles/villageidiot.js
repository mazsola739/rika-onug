const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.villageidiot = () => {
  const playerCards = collectCardInfo(gameState.players);
  const villageidiotPlayer = getPlayersByCardIds(playerCards, [26]);

  return villageidiotPlayer;
};
