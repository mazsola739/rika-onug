const { DEAL, REDIRECT } = require("../constant/ws");
const { logTrace } = require("../log");
const { validateRoom } = require("../validator");
const { repository } = require("../repository");
const { STAGES } = require("../constant/stage");
const { distributeCards } = require("../utils/card");
const { broadcast } = require("./connections");
const { cardIdToTokenBuilder } = require("../utils");
const { upsertRoomState } = repository;

exports.deal = async (ws, message) => {
  const { room_id, token } = message;
  logTrace(`Dealing cards for players in room: ${room_id}`);
  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid)
    return ws.send(JSON.stringify({ type: DEAL, success: false, errors }));

  const player = gameState.players[token];

  const { centerCards, playerCards, chosenWolfId, chosenSupervillainId } =
    distributeCards(gameState.selected_cards);

  const newGameState = {
    ...gameState,
    stage: STAGES.GAME_TABLE,
    center_cards: {
      base: centerCards,
      chosenWolfId,
      chosenSupervillainId,
    },
  };
  const playerTokens = Object.keys(gameState.players);

  playerTokens.forEach((token, index) => {
    newGameState.players[token] = {
      ...gameState.players[token],
      player_start_card_id: playerCards[index].id,
      card: {
        start_card: playerCards[index],
        known_card: playerCards[index],
        actual_card: playerCards[index],
        cardEvents: [`${playerCards[index].display_name} was dealt to player.`],
      },
      player_number: index + 1,
    };
    newGameState.cards[cardIdToTokenBuilder(playerCards[index].id)] = token
  });

  // TODO validate player
  await upsertRoomState(newGameState);

  const redirectToGameTable = {
    type: REDIRECT,
    path: `/gametable/${room_id}`
  }
  return broadcast(room_id, redirectToGameTable)
};
