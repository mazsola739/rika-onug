const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
//TODO doppelganger instant action
exports.apprenticeseer = () => {
    const playerCards = collectCardInfo(gameState.players);
    const apprenticeseerinPlayer = getPlayersByCardIds(playerCards, [18]);
  
    return apprenticeseerinPlayer;
}
