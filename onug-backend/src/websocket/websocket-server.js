const WebSocket = require("ws");
const { logTrace, logError } = require("../log");
const { v4: uuidv4 } = require("uuid");
const { validateRoom } = require("../validator");
const { determineTotalPlayers, selectCard, deselectCard } = require("../utils");
const { repository } = require("../repository");
const { upsertRoomState } = repository;

exports.websocketServer = (port) => {
  const wss = new WebSocket.WebSocketServer({ port });
  wss.on("connection", function connection(ws) {
    console.log("Client connected to room websocket server");
    const interval = setInterval(() => {
      ws.send(
        JSON.stringify({
          type: "KEEP-ALIVE",
        })
      );
    }, 1000);
    ws.on("close", () => {
      logTrace("Client disconnected");
    });
    ws.onerror = function () {
      logError("Some Error occurred");
    };
    ws.on("message", async (msg) => {
      const message = JSON.parse(msg);
      logTrace(`msg received: ${msg}`);
      if (message.type === "NEWBIE") {
        ws.send(
          JSON.stringify({
            type: "AUTH",
            token: uuidv4(),
          })
        );
      }
      if (message.type === "UPDATE-SELECT") {
        const { room_id, card_id, action } = message;
        const [roomIdValid, gameState, errors] = await validateRoom(room_id);

        if (!roomIdValid)
          return ws.send(
            JSON.stringify({ ...errors, type: "UPDATE-SELECT", success: false })
          );

        const totalPlayers = determineTotalPlayers(
          gameState.selected_cards.length,
          gameState.selected_cards
        );

        if (totalPlayers > 12) {
          return ws.send(
            JSON.stringify({
              message: "Cannot have more than 12 players.",
              type: "UPDATE-SELECT",
              success: false,
            })
          );
        }

        const newGameState = { ...gameState };

        if (action === "CARD_SELECT") {
          newGameState.selected_cards = selectCard(
            newGameState.selected_cards,
            card_id
          );
        } else if (action === "CARD_DESELECT") {
          newGameState.selected_cards = deselectCard(
            newGameState.selected_cards,
            card_id
          );
        }

        upsertRoomState(newGameState);
        ws.send(
          JSON.stringify({
            type: "UPDATE-SELECT",
            success: true,
          })
        );
      }
    });
  });
};
