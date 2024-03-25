//@ts-check
import { writeFileSync } from 'fs'
import { readFile, unlink } from 'fs/promises'
import { logError, logTrace, logErrorWithStack } from '../log'
import { websocketServerConnectionsPerRoom } from '../websocket/connections'
import roomsData from '../data/rooms.json'
import { roomNames } from '../constant'

export const upsertRoomState = async (state) => {
  logTrace('upsertRoomState')
  const filePath = `${__dirname}/../database/room_${state.room_id}_gamestate.json`
  const roomState = JSON.stringify(state, null, 4)
  const options = { flag: 'w' }
  try {
    writeFileSync(filePath, roomState, options)
    logTrace('room updated')
  } catch (e) {
    logError(e)
  }
}

export const readGameState = async (room_id) => {
  logTrace('read game state')
  const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
  const options = { encoding: 'utf8' }
  try {
    const data = await readFile(filePath, options)
    return JSON.parse(data)
  } catch (error) {
    return logError(
      `###>>> READ_GAME_STATE_ERROR
###>>> `,
      error
    )
  }
}

export const readAllGameStates = async () => {
  logTrace('read all game states')
  const gameStates = {}
  for (let i = 0; i < roomNames.length; i++) {
    let room_id = roomNames[i]
    const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
    const options = { encoding: 'utf8' }
    try {
      const rawData = await readFile(filePath, options)
      gameStates[room_id] = JSON.parse(rawData)
    } catch (error) {
      logTrace('Could not read all gameStates', error)
      gameStates[room_id] = `No gameState found for room_id: ${room_id}`
    }
  }
  return gameStates
}

export const readGameStateByRoomId = async (room_id) => {
  logTrace('read game state by room_id')
  const gameState = {}
  const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
  const options = { encoding: 'utf8' }
  try {
    const rawData = await readFile(filePath, options)
    gameState[room_id] = JSON.parse(rawData)
  } catch (error) {
    logTrace(`Could not read gameState for room_id ${room_id}`, error)
    gameState[room_id] = `No gameState found for room_id: ${room_id}`
  }

  return gameState
}

export const deleteAllGameStates = async () => {
  logTrace('delete all game states')
  for (let i = 0; i < roomNames.length; i++) {
    let room_id = roomNames[i]
    const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
    try {
      await unlink(filePath)
    } catch (error) {
      logTrace(`Could not delete gameState for filePath ${filePath}`, error)
    }
  }
  return { status: 'gamestates deleted' }
}

export const deleteGameStateByRoomId = async (room_id) => {
  logTrace('delete game state by room_id')
  const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
  try {
    await unlink(filePath)
  } catch (error) {
    logTrace(`Could not delete gameState for filePath ${filePath}`, error)
  }

  return { status: 'gamestate deleted' }
}

export const deleteAllPlayers = async () => {
  logTrace('delete all players')
  const gameStates = {}
  for (let i = 0; i < roomNames.length; i++) {
    let room_id = roomNames[i]
    const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
    const options = { encoding: 'utf8' }
    try {
      const rawData = await readFile(filePath, options)
      const newGameState = JSON.parse(rawData)

      Object.keys(newGameState.players).forEach(
        (token) => delete newGameState.players[token]
      )
      await upsertRoomState(newGameState)
      gameStates[room_id] = newGameState
    } catch (error) {
      logTrace(
        `Could not delete all players. No gameState found for room_id: ${room_id}`,
        error
      )
      gameStates[room_id] = `No gameState found for room_id: ${room_id}`
    }
  }

  return { status: 'players deleted from rooms', gameStates }
}

export const deletePlayerByToken = async (token) => {
  logTrace('delete player by token')
  const gameStates = {}

  for (let i = 0; i < roomNames.length; i++) {
    let room_id = roomNames[i]
    const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
    const options = { encoding: 'utf8' }

    try {
      const rawData = await readFile(filePath, options)
      const newGameState = JSON.parse(rawData)

      if (newGameState.players[token]) {
        delete newGameState.players[token]
        await upsertRoomState(newGameState)
        gameStates[room_id] = newGameState
        delete websocketServerConnectionsPerRoom[room_id][token]
      }
    } catch (error) {
      logTrace(
        `Could not delete all players. No gameState found for room_id: ${room_id}`,
        error
      )
      gameStates[room_id] = `No gameState found for room_id: ${room_id}`
    }
  }

  return { status: 'player deleted from rooms', gameStates }
}

export const reInitializeAllGameStates = async () => {
  try {
    logTrace('Re-init all gamestates')
    const gameStates = {}
    for (let index = 0; index < roomNames.length; index++) {
      let room_id = roomNames[index]

      const room = roomsData[index]
      await upsertRoomState(room)
      gameStates[room_id] = room
    }
    return { status: 'rooms re-initialized', gameStates }
  } catch (error) {
    logErrorWithStack(error)
  }

  return { status: 'ERROR during re-initializing game states' }
}
