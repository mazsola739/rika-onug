const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.familyman = () => {
  const playerCards = collectCardInfo(gameState.players);
  const familymanPlayer = getPlayersByRoleIds(playerCards, [78]);

  return familymanPlayer;
};
