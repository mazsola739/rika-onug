const { werewolvesIds } = require("../constants");
const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.werewolves = () => {
  const playerCards = collectCardInfo(gameState.players);
  const werewolvesPlayer = getPlayersByRoleIds(playerCards, [werewolvesIds]);

  return werewolvesPlayer;
};
