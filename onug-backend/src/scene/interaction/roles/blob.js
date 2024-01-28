const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger same result as blob
exports.blob = () => {
    const playerCards = collectCardInfo(gameState.players);
    const blobPlayer = getPlayersByCardIds(playerCards, [44])
  
    return blobPlayer
}
