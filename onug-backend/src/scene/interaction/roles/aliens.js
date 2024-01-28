const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
// TODO doppelganger
exports.aliens = () => {
    const playerCards = collectCardInfo(gameState.players);
    const alienPlayer = getPlayersByRoleIds(playerCards, [71]); //TODO
  
    return alienPlayer;
}
