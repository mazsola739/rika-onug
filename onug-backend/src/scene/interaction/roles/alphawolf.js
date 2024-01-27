exports.alphawolf = () => {
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
    selectable_centers: "center_wolf_card",
  };
};

exports.alphawolf = "alphawolf_kickoff_text"; //wolf center card swap to any non werewolf card - update wolf center actual card & selected player actual card
