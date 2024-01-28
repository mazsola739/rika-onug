const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.troublemaker = () => {
  const playerCards = collectCardInfo(gameState.players);
  const troublemakerPlayer = getPlayersByCardIds(playerCards, [11]);

  return troublemakerPlayer;
};
