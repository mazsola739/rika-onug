const { generateSuccessResponse } = require("../../../util/response-generator");
const { repository } = require("../../repository")

const { readGameState } = repository

const hydrateSelectController = async (event) => {
  /*   console.log(
    `Hydrate-select endpoint triggered with event: ${JSON.stringify(event)}`
  ); */

  let { room_id } = event.body;

  const gameState = await readGameState(room_id);

  return generateSuccessResponse({
    gameState,
  });
};

module.exports = {
  hydrateSelectController,
};
