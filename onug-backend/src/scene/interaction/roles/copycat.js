const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//NO DOPPELGANGER
exports.copycat = () => {
    const playerCards = collectCardInfo(gameState.players);
    const copycatPlayer = getPlayersByRoleIds(playerCards, [30])
  
    return copycatPlayer}
