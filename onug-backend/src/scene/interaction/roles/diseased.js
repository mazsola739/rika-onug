const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger instant action
exports.diseased = () => {
    const playerCards = collectCardInfo(gameState.players);
    const diseasedPlayer = getPlayersByRoleIds(playerCards, [32])
  
    return diseasedPlayer
}
