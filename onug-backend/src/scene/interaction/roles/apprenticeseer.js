const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger instant action
exports.apprenticeseer = () => {
    const playerCards = collectCardInfo(gameState.players);
    const apprenticeseerinPlayer = getPlayersByRoleIds(playerCards, [18]);
  
    return apprenticeseerinPlayer;
}
