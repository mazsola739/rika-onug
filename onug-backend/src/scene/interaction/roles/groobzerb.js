const { groobAndZerbIds } = require("../constants");
const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger check if groob zerb seperatly exist
exports.groobzerb = () => {
  const playerCards = collectCardInfo(gameState.players);
  const groobzerbPlayer = getPlayersByRoleIds(playerCards, [groobAndZerbIds]);

  return groobzerbPlayer;
};
