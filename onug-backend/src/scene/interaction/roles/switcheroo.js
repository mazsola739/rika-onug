const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.switcheroo = () => {
  const playerCards = collectCardInfo(gameState.players);
  const switcherooPlayer = getPlayersByCardIds(playerCards, [68]);

  return switcherooPlayer;
};
