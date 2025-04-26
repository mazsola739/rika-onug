import { writeFileSync } from 'fs'
import { readFile, unlink } from 'fs/promises'
import { logError, logErrorWithStack, logTrace } from '../log'
import roomsData from '../data/rooms_new.json'
import configData from '../data/gamestate_config.json'
import playersData from '../data/gamestate_players.json'
import rolesData from '../data/gamestate_roles.json'
import sceneData from '../data/gamestate_scene.json'
import tableData from '../data/gamestate_table.json'

const FILE_PATH_TEMPLATE = `${__dirname}/../gamestate/`
const ENCODING = 'utf8'
const WRITE_OPTIONS = { flag: 'w' }
const ROOM_GAMESTATE_FILE_TYPES = ['config', 'players', 'roles', 'scene', 'table']

const getRoomFilePath = (room_id, type) => `${FILE_PATH_TEMPLATE}/${room_id}/${type}.json`

const getRoomFilePaths = room_id =>
  ROOM_GAMESTATE_FILE_TYPES.reduce((paths, type) => {
    paths[type] = getRoomFilePath(room_id, type)
    return paths
  }, {})

const ROOM_GAMESTATE_FILE_PATHS = ROOM_GAMESTATE_FILE_TYPES.reduce((paths, type) => {
  paths[type] = room_id => getRoomFilePath(room_id, type)
  return paths
}, {})

const upsertGamestateFile = async (filePath, data) => {
  try {
    writeFileSync(filePath, JSON.stringify(data, null, 2), WRITE_OPTIONS)
    logTrace(`${filePath} updated`)
  } catch (error) {
    logError(error)
  }
}

const readGamestateFile = async filePath => {
  try {
    const data = await readFile(filePath, { encoding: ENCODING })
    return JSON.parse(data)
  } catch (error) {
    logError(`###>>> READ_GAMESTATE_FILE_ERROR: ${filePath}`, error)
    return null
  }
}

const upsertRoomFile = async (room_id, type, newData = null) => {
  const filePath = ROOM_GAMESTATE_FILE_PATHS[type](room_id)

  try {
    const existingData = (await readGamestateFile(filePath)) || {}
    const updatedData = newData
      ? { ...existingData, ...newData }
      : existingData

    if (updatedData) {
      await upsertGamestateFile(filePath, updatedData)
      logTrace(`${type} file upserted for room_id: ${room_id}`)
    } else {
      logTrace(`No changes made to ${type} file for room_id: ${room_id}`)
    }
  } catch (error) {
    logError(`Error upserting ${type} file for room_id: ${room_id}`, error)
  }
}

const DEFAULT_DATA_MAP = {
  config: configData,
  players: playersData,
  roles: rolesData,
  scene: sceneData,
  table: tableData
}

export const upsertRoomData_ = async (room_id, type, newData = null) => {
  const defaultData = DEFAULT_DATA_MAP[type]
  const dataToUpsert = newData || defaultData
  await upsertRoomFile(room_id, type, dataToUpsert)
}

export const readRoomData_ = async (room_id, type) => {
  const filePath = getRoomFilePath(room_id, type)
  return await readGamestateFile(filePath)
}

export const upsertRoomConfig_ = async (room_id, newData = null) => await upsertRoomData_(room_id, 'config', newData)
export const upsertRoomPlayers_ = async (room_id, newData = null) => await upsertRoomData_(room_id, 'players', newData)
export const upsertRoomRoles_ = async (room_id, newData = null) => await upsertRoomData_(room_id, 'roles', newData)
export const upsertRoomScene_ = async (room_id, newData = null) => await upsertRoomData_(room_id, 'scene', newData)
export const upsertRoomTable_ = async (room_id, newData = null) => await upsertRoomData_(room_id, 'table', newData)

export const generateNewRoomConfig_ = async (room_id) => {
  const filePath = getRoomFilePath(room_id, 'config')
  const roomDetails = roomsData.find(room => room.room_id === room_id) || { room_id, room_name: 'Unknown Room' }
  const updatedConfig = {
    ...configData,
    room_id: roomDetails.room_id,
    room_name: roomDetails.room_name
  }
  await upsertGamestateFile(filePath, updatedConfig)
}

export const reInitializeAllGamestates_ = async () => {
  try {
    logTrace('Re-init all gamestates')

    for (let index = 0; index < roomsData.length; index++) {
      const { room_id } = roomsData[index]

      await generateNewRoomConfig_(room_id)
      await upsertRoomPlayers_(room_id)
      await upsertRoomRoles_(room_id)
      await upsertRoomScene_(room_id)
      await upsertRoomTable_(room_id)
    }

    return { status: 'rooms re-initialized' }
  } catch (error) {
    logErrorWithStack(error)
  }

  return { status: 'ERROR during re-initializing gamestates' }
}

export const readRoomConfig_ = async room_id => await readRoomData_(room_id, 'config')
export const readRoomPlayers_ = async room_id => await readRoomData_(room_id, 'players')
export const readRoomRoles_ = async room_id => await readRoomData_(room_id, 'roles')
export const readRoomScene_ = async room_id => await readRoomData_(room_id, 'scene')
export const readRoomTable_ = async room_id => await readRoomData_(room_id, 'table')

export const readGamestateByRoomId_ = async room_id => {
  logTrace('read gamestate by room_id')
  const filePaths = getRoomFilePaths(room_id)
  const gamestate = {}

  await Promise.all(
    Object.entries(filePaths).map(async ([key, filePath]) => {
      try {
        const rawData = await readFile(filePath, { encoding: ENCODING })
        gamestate[key] = JSON.parse(rawData)
      } catch (error) {
        logTrace(`Could not read ${key} gamestate for room_id: ${room_id}`, error)
        gamestate[key] = null
      }
    })
  )

  return gamestate
}

export const readAllGamestates_ = async () => {
  logTrace('read all gamestates')
  const gamestates = {}

  await Promise.all(
    roomsData.map(async ({ room_id }) => {
      gamestates[room_id] = await readGamestateByRoomId_(room_id)
    })
  )

  return gamestates
}

export const removeRoomGamestateById_ = async room_id => {
  logTrace('remove gamestate by room_id')
  const filePaths = Object.values(getRoomFilePaths(room_id))

  try {
    await Promise.all(
      filePaths.map(async filePath => {
        try {
          await unlink(filePath)
          logTrace(`Removed file: ${filePath}`)
        } catch (error) {
          logTrace(`Could not remove file: ${filePath}`, error)
        }
      })
    )
    logTrace(`All gamestate files removed for room_id: ${room_id}`)
  } catch (error) {
    logTrace(`Error removing gamestate files for room_id: ${room_id}`, error)
  }

  return { status: 'gamestate removed' }
}

export const removeAllGamestates_ = async () => {
  logTrace('remove all gamestates')
  const results = {}

  await Promise.all(
    roomsData.map(async ({ room_id }) => {
      try {
        results[room_id] = await removeRoomGamestateById_(room_id)
      } catch (error) {
        logTrace(`Could not remove gamestate for room_id: ${room_id}`, error)
        results[room_id] = `Error removing gamestate: ${error.message}`
      }
    })
  )

  return { status: 'all gamestates removed', results }
}

const modifyPlayersInRoom = async (room_id, modifyFn) => {
  const filePath = getRoomFilePath(room_id, 'players')

  try {
    const rawData = await readFile(filePath, { encoding: ENCODING })
    const gamestate = JSON.parse(rawData)

    modifyFn(gamestate.players)

    await upsertGamestateFile(filePath, gamestate)
    return { status: 'success', room_id }
  } catch (error) {
    logTrace(`Could not modify players for room_id: ${room_id}`, error)
    return { status: 'error', room_id, message: error.message }
  }
}

export const removePlayerByToken_ = async token => {
  logTrace(`remove player by id: ${token}`)
  const results = {}

  await Promise.all(
    roomsData.map(async ({ room_id }) => {
      results[room_id] = await modifyPlayersInRoom(room_id, players => {
        if (players[token]) {
          delete players[token]
        }
      })
    })
  )

  return { status: `Player ${token} removal completed`, results }
}

export const removeAllPlayers_ = async () => {
  logTrace('remove all players')
  const results = {}

  await Promise.all(
    roomsData.map(async ({ room_id }) => {
      results[room_id] = await modifyPlayersInRoom(room_id, players => {
        Object.keys(players).forEach(playerId => delete players[playerId])
      })
    })
  )

  return { status: 'players removed from all rooms', results }
}

/* //TODO
export const readNohupByService = async service => {
  logTrace(`readNohupByService ${service}`)

  const FE_PATH = `${__dirname}/../../../onug-frontend/prod__nohup.txt`
  const BE_PATH_TXT = `${__dirname}/../../prod__nohup.txt`
  const BE_PATH_CRASH = `${__dirname}/../prod__crash.js`

  let rawData = {}

  try {
    if (service === 'frontend') {
      rawData = await readFile(FE_PATH, { encoding: ENCODING })
    } else {
      const logData = await readFile(BE_PATH_TXT, { encoding: ENCODING })
      const crashData = await readFile(BE_PATH_CRASH, { encoding: ENCODING })

      rawData = { logs: logData, crash: crashData }
    }
  } catch (error) {
    logTrace(`Could not read nohup for ${service}`, error)
  }

  return rawData
}
 */