const { logTrace, logDebug } = require("../../log");
const { sceneHandler } = require("./scene-handler");
const script = require("../../data/script.json");
const _ = require("lodash");

const scriptOrder = [
  script.twilight,
  script.dusk,
  script.night,
  script.ripple,
  script.day,
].flatMap((x) => x);

//TODO RIPPLE

exports.narration = (gameState) => {
  const { room_id } = gameState.room_id;
  logTrace(`Narration playing for players in room: ${room_id}`);

  const newGameState = { ...gameState };
  newGameState.actual_scene.scene_title =
    scriptOrder[newGameState.actual_scene.scene_number].scene_title;

  //? what this lodash update actually does: updates newGameState with nested levels of various fields.
  //? For example: 'actual_scene.text' key and the related value will be set inside newGameState.actual_scene.text = [something],
  //? also sometimes other fields, like: oracle_answer: 'some_oracle_answer' will be set as well.
  const entries = sceneHandler(newGameState);
  Object.entries(entries).forEach(([key, value]) => {
    _.update(newGameState, key, () => value);
  });

  if (!entries["actual_scene.text"]) {
    newGameState.actual_scene.text = null;
  }

  logDebug(
    `__NARRATION__ SCENE_NUMBER: ${
      newGameState.actual_scene.scene_number
    } TEXT: ${newGameState.actual_scene.text} scene_title: ${
      scriptOrder[newGameState.actual_scene.scene_number].scene_title
    }`
  );

  return newGameState;
};
