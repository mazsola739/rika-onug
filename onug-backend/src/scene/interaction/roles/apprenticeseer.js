const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.apprenticeseer = () => {
    const playerCards = collectCardInfo(gameState.players);
    const apprenticeseerinPlayer = getPlayersByCardIds(playerCards, [18]);
  
    return apprenticeseerinPlayer;
}
