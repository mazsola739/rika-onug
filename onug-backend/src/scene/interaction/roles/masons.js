const { masonIds } = require("../constants");
const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.masons = () => {
    const playerCards = collectCardInfo(gameState.players);
    const masonPlayer = getPlayersByRoleIds(playerCards, [masonIds]);
  
    return masonPlayer;
}
