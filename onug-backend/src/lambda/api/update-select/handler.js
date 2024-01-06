const { generateSuccessResponse, generateErrorResponse } = require("../../../util/response-generator");
const { validateRoom } = require("../../common/validator");
const { repository } = require("../../repository");

const { upsertRoomState } = repository;

const updateSelectController = async (event) => {
  let { room_id, update } = event.body;
  const { action, card_id } = update;

  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid) return generateErrorResponse(errors);

  const newGameState = { ...gameState };

  if (action === "CARD_SELECT") {
    newGameState.selected_cards = selectCard(newGameState.selected_cards, card_id);
  } else if (action === "CARD_DESELECT") {
    newGameState.selected_cards = deselectCard(newGameState.selected_cards, card_id);
  }

  upsertRoomState(newGameState);

  return generateSuccessResponse({
    message: `Successfully updated`,
  });
};

const selectCard = (selectedCardIds, cardId) => {
  selectedCardIds.push(cardId);
  return Array.from(new Set(selectedCardIds));
};

const deselectCard = (selectedCardIds, cardId) => {
  const index = selectedCardIds.findIndex((selectedCardId) => selectedCardId === cardId);
  if (index !== -1) {
    selectedCardIds.splice(index, 1);
  }
  return selectedCardIds;
};

module.exports = {
  updateSelectController,
};
