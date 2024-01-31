const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { getCardIdsByPlayerNumbers, getPlayerNumbersWithMatchingTokens, getTokensByCardIds, getDoppelgangerTokenByRoleIds, hasDoppelganger } = require("../utils");

//? INFO: Self-Awareness Girl – Looks at her own card, but does not gain its power, just the team alliance. Can’t if it has a Shield on it
exports.selfawarenessgirl = gameState => {
  const newGameState = { ...gameState }
  const role_interactions = [];

  const selfawarenessgirlToken = getTokensByCardIds(newGameState.players, [67]);
  const selfawarenessgirlPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, selfawarenessgirlToken);
  const selfawarenessgirlShowCard = getCardIdsByPlayerNumbers(newGameState.card_positions, selfawarenessgirlPlayerNumber);

  const roleHistory = {
    ...newGameState.actual_scene,
    card_or_mark_action: true,
  }

  selfawarenessgirlToken.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory
    newGameState.players[token].card.team = newGameState.card_positions[`player_${selfawarenessgirlPlayerNumber[0]}`].team

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "interaction_insomniac",
      show_cards: selfawarenessgirlShowCard,
    })

    newGameState.actual_scene.interaction =  `The player ${newGameState.players[token].player_number} viewved their card`
  })

  if (hasDoppelganger(newGameState.players)) {
    const doppelgangerSelfawarenessgirlToken = getDoppelgangerTokenByRoleIds(newGameState.players, [67]);
    const doppelgangerSelfawarenessgirlPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, doppelgangerSelfawarenessgirlToken);
    const doppelgangerSelfawarenessgirlShowCard = getCardIdsByPlayerNumbers(newGameState.card_positions, doppelgangerSelfawarenessgirlPlayerNumber);

    doppelgangerSelfawarenessgirlToken.forEach((token) =>{
      newGameState.players[token].role_history = roleHistory
      newGameState.players[token].card.team = newGameState.card_positions[`player_${doppelgangerSelfawarenessgirlPlayerNumber[0]}`].team

      role_interactions.push({
        type: INTERACTION,
        token,
        message: "insomniac_interaction",
        show_cards: doppelgangerSelfawarenessgirlShowCard,
      })

      newGameState.actual_scene.doppelganger_interaction = `The doppelganger player_${players[token].player_number} viewved their card`
    })
  }

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState;
};
