const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.thing = () => {
  const playerCards = collectCardInfo(gameState.players);
  const thingPlayer = getPlayersByCardIds(playerCards, [85]);

  return thingPlayer;
};
