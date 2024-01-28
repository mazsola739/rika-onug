const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger
exports.revealer = () => {
    const playerCards = collectCardInfo(gameState.players);
    const revealerPlayer = getPlayersByCardIds(playerCards, [24]);
  
    return revealerPlayer;
}
