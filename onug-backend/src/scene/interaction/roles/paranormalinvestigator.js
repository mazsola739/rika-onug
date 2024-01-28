const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.paranormalinvestigator = () => {
  const playerCards = collectCardInfo(gameState.players);
  const paranormalinvestigatorPlayer = getPlayersByCardIds(playerCards, [23]);

  return paranormalinvestigatorPlayer;
};
