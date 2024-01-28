const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger instant action
exports.detector = () => {
    const playerCards = collectCardInfo(gameState.players);
    const detectorPlayer = getPlayersByRoleIds(playerCards, [56])
  
    return detectorPlayer
}
