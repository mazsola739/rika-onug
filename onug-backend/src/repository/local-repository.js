import { writeFileSync } from 'fs'
import { readFile, unlink } from 'fs/promises'
import { logError, logTrace, logErrorWithStack } from '../log'
import { webSocketServerConnectionsPerRoom } from '../websocket/connections'
import roomsData from '../data/rooms.json'
import { ROOM_NAMES } from '../constants'

const FILE_PATH_TEMPLATE = `${__dirname}/../gamestate/`
const ROOM_GAMESTATE_FILE = (room_id) => `${FILE_PATH_TEMPLATE}${room_id}_gamestate.json`
const ENCODING_OPTIONS = { encoding: 'utf8' }
const WRITE_OPTIONS = { flag: 'w' }
const DELETE_STATUS = { status: 'gamestate removed' }

export const upsertRoomState = async (state) => {
  logTrace('upsertRoomState')
  const filePath = ROOM_GAMESTATE_FILE(state.room_id)
  const roomState = JSON.stringify(state, null, 4)

  try {
    writeFileSync(filePath, roomState, WRITE_OPTIONS)
    logTrace('room updated')
  } catch (e) {
    logError(e)
  }
}

export const readGamestate = async (room_id) => {
  logTrace('read gamestate')
  const filePath = ROOM_GAMESTATE_FILE(room_id)

  try {
    const data = await readFile(filePath, ENCODING_OPTIONS)
    return JSON.parse(data)
  } catch (error) {
    return logError(
      `###>>> READ_GAMESTATE_ERROR
###>>> `,
      error
    )
  }
}

export const readAllGamestates = async () => {
  logTrace('read all gamestates')
  const gamestates = {}
  for (let i = 0; i < ROOM_NAMES.length; i++) {
    let room_id = ROOM_NAMES[i]
    const filePath = ROOM_GAMESTATE_FILE(room_id)

    try {
      const rawData = await readFile(filePath, ENCODING_OPTIONS)
      gamestates[room_id] = JSON.parse(rawData)
    } catch (error) {
      logTrace('Could not read all gamestates', error)
      gamestates[room_id] = `No gamestate found for room_id: ${room_id}`
    }
  }
  return gamestates
}

export const readGamestateByRoomId = async (room_id) => {
  logTrace('read gamestate by room_id')
  const gamestate = {}
  const filePath = ROOM_GAMESTATE_FILE(room_id)

  try {
    const rawData = await readFile(filePath, ENCODING_OPTIONS)
    gamestate[room_id] = JSON.parse(rawData)
  } catch (error) {
    logTrace(`Could not read gamestate for room_id ${room_id}`, error)
    gamestate[room_id] = `No gamestate found for room_id: ${room_id}`
  }

  return gamestate
}

export const removeAllGamestates = async () => {
  logTrace('remove all gamestates')
  for (let i = 0; i < ROOM_NAMES.length; i++) {
    let room_id = ROOM_NAMES[i]
    const filePath = ROOM_GAMESTATE_FILE(room_id)

    try {
      await unlink(filePath)
    } catch (error) {
      logTrace(`Could not remove gamestate for filePath ${filePath}`, error)
    }
  }
  return { status: 'gamestates removed' }
}

export const removeRoomGamestateById= async (room_id) => {
  logTrace('remove gamestate by room_id')
  const filePath = ROOM_GAMESTATE_FILE(room_id)

  try {
    await unlink(filePath)
  } catch (error) {
    logTrace(`Could not remove gamestate for filePath ${filePath}`, error)
  }

  return DELETE_STATUS
}

export const removeAllPlayers = async () => {
  logTrace('remove all players')
  const gamestates = {}
  for (let i = 0; i < ROOM_NAMES.length; i++) {
    let room_id = ROOM_NAMES[i]
    const filePath = ROOM_GAMESTATE_FILE(room_id)

    try {
      const rawData = await readFile(filePath, ENCODING_OPTIONS)
      const newGamestate = JSON.parse(rawData)

      Object.keys(newGamestate.players).forEach(
        (token) => delete newGamestate.players[token]
      )
      await upsertRoomState(newGamestate)
      gamestates[room_id] = newGamestate
    } catch (error) {
      logTrace(
        `Could not remove all players. No gamestate found for room_id: ${room_id}`,
        error
      )
      gamestates[room_id] = `No gamestate found for room_id: ${room_id}`
    }
  }

  return { status: 'players removed from rooms', gamestates }
}

export const removePlayerByToken = async (token) => {
  logTrace('remove player by token')
  const gamestates = {}

  for (let i = 0; i < ROOM_NAMES.length; i++) {
    let room_id = ROOM_NAMES[i]
    const filePath = ROOM_GAMESTATE_FILE(room_id)

    try {
      const rawData = await readFile(filePath, ENCODING_OPTIONS)
      const newGamestate = JSON.parse(rawData)

      if (newGamestate.players[token]) {
        delete newGamestate.players[token]
        await upsertRoomState(newGamestate)
        gamestates[room_id] = newGamestate
        delete webSocketServerConnectionsPerRoom[room_id][token]
      }
    } catch (error) {
      logTrace(
        `Could not remove all players. No gamestate found for room_id: ${room_id}`,
        error
      )
      gamestates[room_id] = `No gamestate found for room_id: ${room_id}`
    }
  }

  return { status: 'player removed from rooms', gamestates }
}

export const reInitializeAllGamestates = async () => {
  try {
    logTrace('Re-init all gamestates')
    const gamestates = {}
    for (let index = 0; index < ROOM_NAMES.length; index++) {
      let room_id = ROOM_NAMES[index]

      const room = roomsData[index]
      await upsertRoomState(room)
      gamestates[room_id] = room
    }
    return { status: 'rooms re-initialized', gamestates }
  } catch (error) {
    logErrorWithStack(error)
  }

  return { status: 'ERROR during re-initializing gamestates' }
}
