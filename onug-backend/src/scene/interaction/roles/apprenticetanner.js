const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.apprenticetanner = () => {
    const playerCards = collectCardInfo(gameState.players);
    const apprenticetannerinPlayer = getPlayersByRoleIds(playerCards, [71]);
  
    return apprenticetannerinPlayer;
}
