const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger seperated
exports.bodysnatcher = () => {
    const playerCards = collectCardInfo(gameState.players);
    const bodysnatcherPlayer = getPlayersByCardIds(playerCards, [74])
  
    return bodysnatcherPlayer
}
