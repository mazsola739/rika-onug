const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger
exports.assassin = () => {
    const playerCards = collectCardInfo(gameState.players);
    const assassininPlayer = getPlayersByCardIds(playerCards, [29]);
  
    return assassininPlayer;
}
