const { generateSuccessResponse } = require("../../../util/response-generator");
const { repository } = require("../../repository")

const { readGameState } = repository

const hydrateSelectController = async (event) => {
  /*   console.log(
    `Hydrate-select endpoint triggered with event: ${JSON.stringify(event)}`
  ); */

  let { roomId } = event.body;

  const gameState = await readGameState(roomId);

  return generateSuccessResponse({
    gameState,
  });
};

module.exports = {
  hydrateSelectController,
};
