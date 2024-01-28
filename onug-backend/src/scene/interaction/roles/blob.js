const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger same result as blob
exports.blob = () => {
    const playerCards = collectCardInfo(gameState.players);
    const blobPlayer = getPlayersByRoleIds(playerCards, [44])
  
    return blobPlayer
}
