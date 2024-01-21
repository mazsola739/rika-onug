const { STAGES } = require("../constant/stage");

exports.isGameTableClosed = (gameState) => gameState.stage !== STAGES.GAME_TABLE
exports.isGamePlayStopped = (gameState) => gameState.stage !== STAGES.GAME_PLAY