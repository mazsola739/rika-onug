const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.bodysnatcher = () => {
    const playerCards = collectCardInfo(gameState.players);
    const bodysnatcherPlayer = getPlayersByRoleIds(playerCards, [74])
  
    return bodysnatcherPlayer
}
