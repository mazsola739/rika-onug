const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { getCardIdsByPlayerNumbers, getPlayerNumbersWithMatchingTokens, getTokensByRoleIds } = require("../utils");

//? INFO: SAME AS INSOMNIAC! Self-Awareness Girl – Looks at her own card, but does not gain its power, just the team alliance. Can’t if it has a Shield on it
exports.selfawarenessgirl = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = [];

  if (!newGameState.players[token].card.shield) {
    const selfawarenessgirlPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token]);
    const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, selfawarenessgirlPlayerNumber);

    const roleHistory = {
      ...newGameState.actual_scene,
      show_cards: showCards,
      card_or_mark_action: true,
    }

    newGameState.players[token].role_history = roleHistory
    newGameState.players[token].card.team = newGameState.card_positions[`player_${selfawarenessgirlPlayerNumber[0]}`]?.team

    role_interactions.push({
      type: INTERACTION,
      title: "SELF_AWARENESS_GIRL",
      token,
      message: "interaction_insomniac",
      show_cards: showCards,
      shielded_players: newGameState.shield,
    })

    newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed their card`
  } else if (newGameState.players[token].card.shield) {
    role_interactions.push({
      type: INTERACTION,
      title: "SELF_AWARENESS_GIRL",
      token,
      message: "interaction_shielded",
      shielded_players: newGameState.shield,
    })

    newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} has shield, can't view their card`
  }

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState;
};
