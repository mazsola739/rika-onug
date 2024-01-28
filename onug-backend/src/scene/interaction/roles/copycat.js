const { collectCardInfo, getPlayersByCardIds } = require("../utils");

exports.copycat = () => {
    const playerCards = collectCardInfo(gameState.players);
    const copycatPlayer = getPlayersByCardIds(playerCards, [30])
  
    return copycatPlayer}
