const { HYDRATE_GAME_PLAY, REDIRECT } = require("../constant/ws");
const { logTrace } = require("../log");
const { repository } = require('../repository');
const { isGamePlayStopped } = require("../utils");
const { readGameState } = repository

exports.hydrateGamePlay = async (ws, message) => {
  logTrace(`hydrate game play ${JSON.stringify(message)}`)
  const { room_id } = message;
  const gameState = await readGameState(room_id)

  if (isGamePlayStopped(gameState)) return ws.send(
    JSON.stringify({ type: REDIRECT, path: `/room/${room_id}`  })
  );
 
  // TODO read actual action and scene from gamestate
  /*
 const actionForRobber = { 
  text: 'Robber, you may swap your card now!',
  type: ["SWAP", "CHECK_CARD"],
  interactiveCards: [1, 4, 6],
  remainingSeconds: 10
}
const actionForRobberEveryOneElse = { 
  text: 'Robber is in play, He might swap their card with another player or from center'
}
*/
  return ws.send(
    JSON.stringify({ type: HYDRATE_GAME_PLAY, scene: 0, action: { action: 'EVERYONE, close your eyes.'} })
  );
};
