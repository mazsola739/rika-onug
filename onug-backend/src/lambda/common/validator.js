const { repository } = require("../repository");

const { readGameState } = repository;

const validCardIds = [1, 86];

const CARDS_ARE_NOT_AN_ARRAY = "Cards were not provided as an array";
const CARD_IDS_NOT_IN_VALID_RANGE = "Card IDs were not in the right ID range";
const DUPLICATED_CARD_IDS = "Card IDs were duplicated.";

const validateCards = (cards) => {
  const errors = [];

  const cardsStructIsArray = Array.isArray(cards);
  if (!cardsStructIsArray) {
    errors.push(CARDS_ARE_NOT_AN_ARRAY);
    return [false, errors];
  }

  const cardsAreInTheRightIdRange = cards.every(
    (card) => card >= validCardIds[0] && card <= validCardIds[1]
  );
  if (!cardsAreInTheRightIdRange) errors.push(CARD_IDS_NOT_IN_VALID_RANGE);

  const duplicates = new Set(cards).size !== cards.length;
  if (duplicates) errors.push(`${DUPLICATED_CARD_IDS} IDs: ${cards}`);

  const validity = errors.length === 0;
  if (!validity) console.log(`Validation errors: ${errors}`);

  return [validity, errors];
};

const roomIds = [
  "foyer", "archives", "armory", "dynamite_room", "great_hall",
  "guest_bedroom", "kitchen", "laboratory", "observatory", "panic_room",
  "parlor", "secret_passage", "sitting_room", "staff_quarters", "study", "workshop"
];

const validateRoom = async (roomId) => {
  const errors = [];
  
  const roomIdExists = roomIds.includes(roomId);
  if (!roomIdExists) {
    errors.push("Invalid room id");
    return [false, {}, errors];
  }

  const gameState = await readGameState(roomId);

  if (!gameState) {
    errors.push("Room does not exist");
  }

  const closed = gameState?.closed;
  if (closed) {
    errors.push("Gamestate is already closed for that room id");
  }

  const playersFull = gameState?.players?.length === 12;
  if (playersFull) {
    errors.push("Room is already full");
  }

  const validity = errors.length === 0;
  if (!validity) console.log(`Validation errors: ${errors}`);

  return [validity, gameState, errors];
};

const validatePlayer = async (room_id, player_name) => {
  const [isValidRoom, gameState] = await validateRoom(room_id);
  
  if (!isValidRoom) {
    return [false, "Invalid room"];
  }

  const isPlayerAlreadyInRoom = gameState?.players?.some(player => player.name === player_name);

  if (isPlayerAlreadyInRoom) {
    return [false, "Player is already in the room"];
  }

  return [true, "Player can join"];
};

module.exports = {
  validateCards,
  validateRoom,
  validatePlayer
};