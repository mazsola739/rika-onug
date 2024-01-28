const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.cow = () => {
    const playerCards = collectCardInfo(gameState.players);
    const cowPlayer = getPlayersByRoleIds(playerCards, [45])
  
    return cowPlayer
}
