const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.assassin = () => {
    const playerCards = collectCardInfo(gameState.players);
    const assassininPlayer = getPlayersByRoleIds(playerCards, [29]);
  
    return assassininPlayer;
}
