const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { getCardIdsByPlayerNumbers, getPlayerNumbersWithMatchingTokens, findPlayersByCardIds, findDoppelgangerPlayerByRoleIds } = require("../utils");

//? INFO: Insomniac – Looks at her own card, but does not gain its power, just the team alliance. Can’t if it has a Shield on it
exports.insomniac = gameState => {
  const newGameState = { ...gameState }
  const role_interactions = [];

  const insomniacTokens = findPlayersByCardIds(newGameState.players, [4]);
  const insomniacPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, insomniacTokens);
  const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, insomniacPlayerNumbers);

  const roleHistory = {
    ...newGameState.actual_scene,
    card_or_mark_action: true,
  }

  insomniacTokens.forEach((token) => {
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      token,
      text: "interaction_insomniac",
      show_cards: showCards,
    })
  })

  //TODO (only do if doppelganger?)
  const doppelgangerInsomniacToken = findDoppelgangerPlayerByRoleIds(newGameState.players, [4]);
  const doppelgangerInsomniacPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, doppelgangerInsomniacToken);
  const doppelgangerShowCard = getCardIdsByPlayerNumbers(newGameState.card_positions, doppelgangerInsomniacPlayerNumber);

  doppelgangerInsomniacToken.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory
    newGameState.players[token].card.team = newGameState.card_positions[`player_${doppelgangerInsomniacPlayerNumber[0]}`].team

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "insomniac_interaction",
      show_cards: doppelgangerShowCard,
    })
  })

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`);

  return newGameState;
};
