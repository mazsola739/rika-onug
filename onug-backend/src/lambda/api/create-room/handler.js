const validator = require("../../common/validator");
const { v4: uuidv4 } = require("uuid");
const {
  generateErrorResponse,
  generateSuccessResponse,
} = require("../../../util/response-generator");
const { randomPlayerName } = require("../../common/name-generator");
const { repository } = require("../../repository")

const { upsertRoomState } = repository
const { validateCards } = validator;

const createRoomController = async (event) => {
  console.log(
    `Create-room endpoint triggered with event: ${JSON.stringify(event)}`
  );

  // extract settings, validate
  let { cards, playerName } = event.body;
  const [cardIdsAreValid, errors] = validateCards(cards);
  if (!cardIdsAreValid) return generateErrorResponse(errors);

  // create new room
  const roomId = uuidv4();
  const playerId = playerName || randomPlayerName();
  console.log(`room id: ${roomId}`);

  await upsertRoomState({
    roomId,
    selectedCards: cards,
    actions: [], // TODO - everyone from frontend
    actionLog: [],
    players: [
      {
        name: playerId,
        admin: true,
      },
    ],
    turn: 0,
    closed: false,
  });

  return generateSuccessResponse({
    message: `room ${roomId} successfully created`,
    roomId,
  });
};

module.exports = {
  createRoomController,
};
