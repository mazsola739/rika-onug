const { superVillainsIds } = require("../constants");
const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.supervillains = () => {
  const playerCards = collectCardInfo(gameState.players);
  const supervillainsPlayer = getPlayersByRoleIds(playerCards, [superVillainsIds]);

  return supervillainsPlayer;
};
