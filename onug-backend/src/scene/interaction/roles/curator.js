const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.curator = () => {
    const playerCards = collectCardInfo(gameState.players);
    const curatorPlayer = getPlayersByRoleIds(playerCards, [20])
  
    return curatorPlayer
}
