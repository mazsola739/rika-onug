const { collectCardInfo, getPlayersWithMarkOfLove } = require("../utils");

exports.lovers = () => {
  const playerCards = collectCardInfo(gameState.players);
  const loverPlayer = getPlayersWithMarkOfLove(playerCards);

  return loverPlayer;
};
