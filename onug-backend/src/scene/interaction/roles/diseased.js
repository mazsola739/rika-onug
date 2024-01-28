const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.diseased = () => {
    const playerCards = collectCardInfo(gameState.players);
    const diseasedPlayer = getPlayersByCardIds(playerCards, [32])
  
    return diseasedPlayer
}
