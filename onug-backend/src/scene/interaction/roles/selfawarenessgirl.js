const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.selfawarenessgirl = () => {
  const playerCards = collectCardInfo(gameState.players);
  const selfawarenessgirlPlayer = getPlayersByRoleIds(playerCards, [67]);

  return selfawarenessgirlPlayer;
};
