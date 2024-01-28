const { alienIds } = require("../constants");
const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.aliens = () => {
    const playerCards = collectCardInfo(gameState.players);
    const alienPlayer = getPlayersByRoleIds(playerCards, [alienIds]);
  
    return alienPlayer;
}
