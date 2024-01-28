const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger instant action
exports.cupid = () => {
    const playerCards = collectCardInfo(gameState.players);
    const cupidPlayer = getPlayersByRoleIds(playerCards, [31])
  
    return cupidPlayer
}
