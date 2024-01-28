const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.beholder = () => {
    const playerCards = collectCardInfo(gameState.players);
    const beholderPlayer = getPlayersByRoleIds(playerCards, [73]);
  
    return beholderPlayer;
}
