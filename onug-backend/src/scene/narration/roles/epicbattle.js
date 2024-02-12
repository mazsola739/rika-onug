const { logError } = require("../../../log");

const random_easteregg_nobadguys = [
  "easteregg_nobadguys_text_1",
  "easteregg_nobadguys_text_2",
  "easteregg_nobadguys_text_3",
  "easteregg_nobadguys_text_4",
  "easteregg_nobadguys_text_5",
  "easteregg_nobadguys_text_6",
  "easteregg_nobadguys_text_7",
  "easteregg_nobadguys_text_8",
  "easteregg_nobadguys_text_9",
  "easteregg_nobadguys_text_10",
];
const random_easteregg_nogoodguys = [
  "easteregg_nogoodguys_text_1",
  "easteregg_nogoodguys_text_2",
  "easteregg_nogoodguys_text_3",
  "easteregg_nogoodguys_text_4",
  "easteregg_nogoodguys_text_5",
  "easteregg_nogoodguys_text_6",
  "easteregg_nogoodguys_text_7",
  "easteregg_nogoodguys_text_8",
  "easteregg_nogoodguys_text_9",
  "easteregg_nogoodguys_text_10",
];

exports.epicbattle = (
  easterEgg,
  battle,
  totalPlayers,
  nobadguys,
  nogoodguys
) => {
  const result = [];

  if (easterEgg) {
    if (totalPlayers === 12) {
      result.push("easteregg_really_text", "easteregg_whatever_text");
      logError("_______________RESULT: ", result);
    } else if (nobadguys) {
      result.push(
        getRandomItemFromArray(random_easteregg_nobadguys),
        "easteregg_whatever_text"
      );
      logError("_______________RESULT: ", result);
    } else if (nogoodguys) {
      result.push(
        getRandomItemFromArray(random_easteregg_nogoodguys),
        "easteregg_whatever_text"
      );
      logError("_______________RESULT: ", result);
    }
  } else if (battle) {
    result.push("everyone_epic_intro_text");
    logError("_______________RESULT: ", result);
  }

  logError("_______________RESULT: ", result);
  return result;
};
