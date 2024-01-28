const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.voodoolou = () => {
  const playerCards = collectCardInfo(gameState.players);
  const voodoolouPlayer = getPlayersByCardIds(playerCards, [70]);

  return voodoolouPlayer;
};
