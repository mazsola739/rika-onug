const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.doppelganger = () => {const playerCards = collectCardInfo(gameState.players);
    const doppelgangerPlayer = getPlayersByRoleIds(playerCards, [1])
  
    return doppelgangerPlayer}
  