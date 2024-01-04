const { generateSuccessResponse } = require("../../../util/response-generator");
const { validateRoom } = require("../../common/validator");
const { repository } = require("../../repository")

const { upsertRoomState } = repository
const updateSelectController = async (event) => {
  console.log(
    `Update-select endpoint triggered with event: ${JSON.stringify(event)}`
  );

  let { roomId, update } = event.body;

  const { action } = update;

  const [roomIdValid, gameState, errors] = await validateRoom(roomId);
  if (!roomIdValid) return generateErrorResponse(errors);

  if (action === "CARD_SELECT") {
    const newGameState = { ...gameState };
    const { cardId } = update;
    newGameState.selectedCards = selectCard(newGameState.selectedCards, cardId);
    upsertRoomState(newGameState);
  }

  if (action === "CARD_DESELECT") {
    const newGameState = { ...gameState };
    const { cardId } = update;
    deselectCard(newGameState.selectedCards, cardId);
    upsertRoomState(newGameState);
  }

  return generateSuccessResponse({
    message: `successfully updated`,
  });
};

const selectCard = (selectedCardIds, cardId) => {
  selectedCardIds.push(cardId);
  return Array.from(new Set(selectedCardIds));
};
const deselectCard = (selectedCardIds, cardId) => {
  const index = selectedCardIds.findIndex(
    (selectedCardId) => selectedCardId === cardId
  );
  if (index !== -1) {
    selectedCardIds.splice(index, 1);
  }
};

module.exports = {
  updateSelectController,
};
