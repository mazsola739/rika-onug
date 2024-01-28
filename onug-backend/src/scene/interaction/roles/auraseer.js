const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.auraseer = () => {
    const playerCards = collectCardInfo(gameState.players);
    const auraseerPlayer = getPlayersByRoleIds(playerCards, [72]);
  
    return auraseerPlayer;
}
