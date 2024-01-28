const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger seperated
exports.curator = () => {
    const playerCards = collectCardInfo(gameState.players);
    const curatorPlayer = getPlayersByCardIds(playerCards, [20])
  
    return curatorPlayer
}
