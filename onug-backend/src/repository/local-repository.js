const { writeFileSync } = require("fs")
const { readFile, unlink } = require("fs/promises")
const { logError, logTrace } = require("../log")
const roomNames = require("../data/room_names.json")

const upsertRoomState = async (state) => {
  logTrace("upsertRoomState")
  const filePath = `${__dirname}/../database/room_${state.room_id}_gamestate.json`
  const roomState = JSON.stringify(state, null, 4)
  const options = { flag: "w" }
  try {
    writeFileSync(filePath, roomState, options)
    logTrace("room updated")
  } catch (e) {
    logError(e)
  }
}

const readGameState = async (room_id) => {
  logTrace("read game state")
  const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
  const options = { encoding: "utf8" }
  try {
    const data = await readFile(filePath, options)
    return JSON.parse(data)
  } catch (e) {
    logError(`###>>> READ_GAME_STATE_ERROR
###>>> ${e}`)
    return
  }
}

const readAllGameStates = async () => {
  logTrace("read all game states")
  const gameStates = {}
  for (let i = 0; i < roomNames.length; i++) {
    let room_id = roomNames[i]
    const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
    const options = { encoding: "utf8" }
    try {
      const rawData = await readFile(filePath, options)
      const data = JSON.parse(rawData)
      gameStates[room_id] = data
    } catch (e) {
      logTrace(`warn: ${JSON.stringify(e)}`)
      gameStates[room_id] = `No gameState found for room_id: ${room_id}`
    }
  }
  return gameStates
}

const readGameStateByRoomId = async (room_id) => {
  logTrace("read game state by room_id")
  const gameState = {}
  const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
  const options = { encoding: "utf8" }
  try {
    gameState
    const rawData = await readFile(filePath, options)
    const data = JSON.parse(rawData)
    gameState[room_id] = data
  } catch (e) {
    logTrace(`warn: ${JSON.stringify(e)}`)
    gameState[room_id] = `No gameState found for room_id: ${room_id}`
  }

  return gameState
}

const deleteAllGameStates = async () => {
  logTrace("delete all game states")
  for (let i = 0; i < roomNames.length; i++) {
    let room_id = roomNames[i]
    const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
    try {
      await unlink(filePath)
    } catch (e) {
      logTrace(`warn: ${JSON.stringify(e)}`)
    }
  }
  return { status: "gamestates deleted" }
}

const deleteGameStateByRoomId = async (room_id) => {
  logTrace("delete game state by room_id")
  const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
  try {
    await unlink(filePath)
  } catch (e) {
    logTrace(`warn: ${JSON.stringify(e)}`)
  }

  return { status: "gamestate deleted" }
}

const deleteAllPlayers = async () => {
  logTrace("delete all players")
  const gameStates = {}
  for (let i = 0; i < roomNames.length; i++) {
    let room_id = roomNames[i]
    const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
    const options = { encoding: "utf8" }
    try {
      const rawData = await readFile(filePath, options)
      const newGameState = JSON.parse(rawData)

      Object.keys(newGameState.players).forEach(
        (token) => delete newGameState.players[token]
      )
      upsertRoomState(newGameState)
      gameStates[room_id] = newGameState
    } catch (e) {
      logTrace(`warn: ${JSON.stringify(e)}`)
      gameStates[room_id] = `No gameState found for room_id: ${room_id}`
    }
  }

  return { status: "players deleted from rooms", gameStates }
}

const deletePlayerByToken = async (token) => {
  logTrace("delete player by token");
  const gameStates = {}

  for (let i = 0; i < roomNames.length; i++) {
    let room_id = roomNames[i]
    const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
    const options = { encoding: "utf8" }

    try {
      const rawData = await readFile(filePath, options)
      const newGameState = JSON.parse(rawData)

      if (newGameState.players[token]) {
        delete newGameState.players[token];
        upsertRoomState(newGameState);
        gameStates[room_id] = newGameState;
      } 
    } catch (e) {
      logTrace(`warn: ${JSON.stringify(e)}`)
      gameStates[room_id] = `No gameState found for room_id: ${room_id}`
    }
  }

  return { status: "player deleted from rooms", gameStates }
};

module.exports = {
  upsertRoomState,
  readGameState,
  readAllGameStates,
  readGameStateByRoomId,
  deleteAllGameStates,
  deleteGameStateByRoomId,
  deleteAllPlayers,
  deletePlayerByToken,
}
