const { collectCardInfo, getPlayersWithMark } = require("../utils");

exports.lovers = () => {
  const playerCards = collectCardInfo(gameState.players);
  const loverPlayer = getPlayersWithMark(playerCards, "mark_of_love");

  return loverPlayer;
};
