const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.temptress = () => {
  const playerCards = collectCardInfo(gameState.players);
  const temptressPlayer = getPlayersByCardIds(playerCards, [69]);

  return temptressPlayer;
};
