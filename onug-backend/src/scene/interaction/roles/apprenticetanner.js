const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.apprenticetanner = () => {
    const playerCards = collectCardInfo(gameState.players);
    const apprenticetannerinPlayer = getPlayersByRoleIds(playerCards, [71]);
  
    return apprenticetannerinPlayer;
}
