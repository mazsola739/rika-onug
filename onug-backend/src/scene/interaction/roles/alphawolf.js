//wolf center card swap to any non werewolf card - update wolf center card & selected player card

exports.alphawolf = () => {};

exports.alphawolf_request = () => {
  const playerCards = collectKnownCardInfo(gameState.players);
  const werewolvesIds = [15, 16, 17, 21, 22];

  const findNonWerewolfPlayers = () => {
    const nonWerewolfPlayers = [];

    for (const playerNumber in playerCards) {
      if (Object.hasOwnProperty.call(playerCards, playerNumber)) {
        const cardID = playerCards[playerNumber];

        if (!werewolvesIds.includes(cardID)) {
          nonWerewolfPlayers.push(playerNumber);
        }
      }
    }

    return nonWerewolfPlayers;
  };

  return {
    selectable_players: findNonWerewolfPlayers(),
  };
};
exports.alphawolf_result = (selectedPlayer) => {
  //save into card hitory: scene, role player, selected player?
  //save new player card
  //save new wolfcard
  //send message to the role player successfully changed
};