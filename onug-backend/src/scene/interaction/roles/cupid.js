const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.cupid = () => {
    const playerCards = collectCardInfo(gameState.players);
    const cupidPlayer = getPlayersByCardIds(playerCards, [31])
  
    return cupidPlayer
}
