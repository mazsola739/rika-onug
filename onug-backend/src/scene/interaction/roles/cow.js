const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.cow = () => {
    const playerCards = collectCardInfo(gameState.players);
    const cowPlayer = getPlayersByRoleIds(playerCards, [45])
  
    return cowPlayer
}
