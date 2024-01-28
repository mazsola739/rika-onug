const { collectCardInfo, getPlayersByCardIds } = require("../utils");

exports.oracle = () => {
    const playerCards = collectCardInfo(gameState.players);
    const oraclePlayer = getPlayersByCardIds(playerCards, [50]);
  
    return oraclePlayer;
}

exports.oracle_question = () => {}
exports.oracle_reaction = () => {}
