//wolf center card swap to any non werewolf card - update wolf center card & selected player card
//TODO doppelganger instant action
const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.alphawolf = () => {
  const playerCards = collectCardInfo(gameState.players);
  const alphaWolfPlayer = getPlayersByRoleIds(playerCards, [17])

  return alphaWolfPlayer
};


const alphawolf_request = () => {
  const playerCards = collectCardInfo(gameState.players);
  const werewolvesIds = [15, 16, 17, 21, 22];

  const findNonWerewolfPlayers = () => {
    const nonWerewolfPlayers = [];

    for (const playerNumber in playerCards) {
      if (Object.hasOwnProperty.call(playerCards, playerNumber)) {
        const cardId = playerCards[playerNumber];

        if (!werewolvesIds.includes(cardId)) {
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

const alphawolf_result = (selectedPlayer) => {
  //? save into card hitory: scene, role player, selected player
  //!save new player card
  //!save new wolfcard
  //*send message to the role player successfully changed
};