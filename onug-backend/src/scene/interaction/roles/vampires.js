const { vampireIds } = require("../constants");
const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.vampires = () => {
  const playerCards = collectCardInfo(gameState.players);
  const vampirePlayer = getPlayersByRoleIds(playerCards, [vampireIds]);

  return vampirePlayer;
};
