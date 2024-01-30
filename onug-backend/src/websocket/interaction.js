const { logDebug, logError } = require("../log");
const { repository } = require("../repository");
const { werewolves_response } = require("../scene/interaction/roles/werewolves");

const { readGameState, upsertRoomState } = repository;

exports.interaction = async (ws, message) => {
  try {
    logDebug(`Interaction requested with ${JSON.stringify(message)}`);
    const { room_id, token, selected_positions } = message;
    const gameState = await readGameState(room_id);
    // TODO validate client request

    // TODO all other roles
/*     const actual_interaction = gameState.ongoing_interactions.FIND_FIRST(ongoingInteraction => ongoingInteraction.token === token)

    actual_interaction.interaction_type

    const generateInteractionResponse = (interaction_type, gameState, selected_positions ws) => {
      if (!interaction_type) return ws.send(JSON.stringify({VALAMI HIBA ÜZI}))
      if (actual_interaction.interaction_type === "ALPHA_WOLF") return alphawolf_response(gameState, selected_positions, ws)
      if (actual_interaction.interaction_type === "WEREWOLF") return werewolves_response(ws, message)

      return ws.send(JSON.stringify({VALAMI HIBA ÜZI}))
  
    }

    "ongoing_interactions": [
      {
          "token": "player_token",
          "interaction_type": "ALPHA_WOLF",
          "selectable_cards": ""
      }
  ], */
    const newGameState = werewolves_response(gameState, selected_positions, ws)

    await upsertRoomState(newGameState);

  } catch (error) {
    logError(error);
  }
};
 