const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
//TODO doppelganger instant action
exports.witch = () => {
  const playerCards = collectCardInfo(gameState.players);
  const witchPlayer = getPlayersByCardIds(playerCards, [27]);

  return witchPlayer;
};
