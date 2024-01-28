const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.auraseer = () => {
    const playerCards = collectCardInfo(gameState.players);
    const auraseerPlayer = getPlayersByRoleIds(playerCards, [72]);
  
    return auraseerPlayer;
}
