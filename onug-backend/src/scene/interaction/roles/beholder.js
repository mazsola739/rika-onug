const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.beholder = () => {
    const playerCards = collectCardInfo(gameState.players);
    const beholderPlayer = getPlayersByRoleIds(playerCards, [73]);
  
    return beholderPlayer;
}
