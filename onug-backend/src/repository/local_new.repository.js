import { writeFileSync, readFileSync, unlinkSync } from 'fs'
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

const getRoomFilePath = (room_id, type) => `${FILE_PATH_TEMPLATE}${room_id}/${type}.json`

const getRoomFilePaths = room_id =>
  ROOM_GAMESTATE_FILE_TYPES.reduce((paths, type) => {
    paths[type] = getRoomFilePath(room_id, type)
    return paths
  }, {})

const ROOM_GAMESTATE_FILE_PATHS = ROOM_GAMESTATE_FILE_TYPES.reduce((paths, type) => {
  paths[type] = room_id => getRoomFilePath(room_id, type)
  return paths
}, {})

const upsertGamestateFile = (filePath, data) => {
  try {
    writeFileSync(filePath, JSON.stringify(data, null, 2), WRITE_OPTIONS)
    logTrace(`${filePath} updated`)
  } catch (error) {
    logError(error)
  }
}

const readGamestateFile = filePath => {
  try {
    const data = readFileSync(filePath, { encoding: ENCODING })
    return JSON.parse(data)
  } catch (error) {
    if (error.code === 'ENOENT') {
      logTrace(`File not found: ${filePath}. Creating with default data.`)
      const type = filePath.split('/').pop().replace('.json', '')
      const defaultData = DEFAULT_DATA_MAP[type] || {}
      writeFileSync(filePath, JSON.stringify(defaultData, null, 2), WRITE_OPTIONS)
      return defaultData
    }
    logError(`###>>> READ_GAMESTATE_FILE_ERROR: ${filePath}`, error)
    return null
  }
}

const upsertRoomFile = (room_id, type, newData = null) => {
  const filePath = ROOM_GAMESTATE_FILE_PATHS[type](room_id)

  try {
    const existingData = readGamestateFile(filePath) || {}
    const updatedData = newData
      ? { ...existingData, ...newData }
      : existingData

    upsertGamestateFile(filePath, updatedData)
    logTrace(`${type} file upserted for room_id: ${room_id}`)
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

export const upsertRoomData_ = (room_id, type, newData = null) => {
  const defaultData = DEFAULT_DATA_MAP[type]
  const dataToUpsert = newData || defaultData
  upsertRoomFile(room_id, type, dataToUpsert)
}

export const readRoomData_ = (room_id, type) => {
  const filePath = getRoomFilePath(room_id, type)
  return readGamestateFile(filePath)
}

export const upsertRoomConfig_ = (room_id, newData = null) => upsertRoomData_(room_id, 'config', newData)
export const upsertRoomPlayers_ = (room_id, newData = null) => upsertRoomData_(room_id, 'players', newData)
export const upsertRoomRoles_ = (room_id, newData = null) => upsertRoomData_(room_id, 'roles', newData)
export const upsertRoomScene_ = (room_id, newData = null) => upsertRoomData_(room_id, 'scene', newData)
export const upsertRoomTable_ = (room_id, newData = null) => upsertRoomData_(room_id, 'table', newData)

export const generateNewRoomConfig_ = room_id => {
  const filePath = getRoomFilePath(room_id, 'config')
  const roomDetails = roomsData.find(room => room.room_id === room_id) || { room_id, room_name: 'Unknown Room' }
  const updatedConfig = {
    room_id: roomDetails.room_id,
    room_name: roomDetails.room_name,
    ...configData
  }
  upsertGamestateFile(filePath, updatedConfig)
}

export const reInitializeAllGamestates_ = () => {
  try {
    logTrace('Re-init all gamestates')

    for (const { room_id } of roomsData) {
      const filePaths = getRoomFilePaths(room_id)

      ROOM_GAMESTATE_FILE_TYPES.forEach(type => {
        const filePath = filePaths[type]

        if (type === 'config') {
          generateNewRoomConfig_(room_id)
        } else {
          const defaultData = DEFAULT_DATA_MAP[type] || {}
          upsertGamestateFile(filePath, defaultData)
          logTrace(`${type} file initialized for room_id: ${room_id}`)
        }
      })
    }

    return { status: 'rooms re-initialized' }
  } catch (error) {
    logErrorWithStack(error)
    return { status: 'ERROR during re-initializing gamestates' }
  }
}

export const readRoomConfig_ = room_id => readRoomData_(room_id, 'config')
export const readRoomPlayers_ = room_id => readRoomData_(room_id, 'players')
export const readRoomRoles_ = room_id => readRoomData_(room_id, 'roles')
export const readRoomScene_ = room_id => readRoomData_(room_id, 'scene')
export const readRoomTable_ = room_id => readRoomData_(room_id, 'table')

export const readGamestateByRoomId_ = room_id => {
  logTrace('read gamestate by room_id')
  const filePaths = getRoomFilePaths(room_id)
  const gamestate = {}

  Object.entries(filePaths).forEach(([key, filePath]) => {
    try {
      const rawData = readFileSync(filePath, { encoding: ENCODING })
      gamestate[key] = JSON.parse(rawData)
    } catch (error) {
      logTrace(`Could not read ${key} gamestate for room_id: ${room_id}`, error)
      gamestate[key] = DEFAULT_DATA_MAP[key] || null
    }
  })

  return gamestate
}

export const readAllGamestates_ = () => {
  logTrace('read all gamestates')
  const gamestates = {}

  roomsData.forEach(({ room_id }) => {
    gamestates[room_id] = readGamestateByRoomId_(room_id)
  })

  return gamestates
}

export const removeRoomGamestateById_ = room_id => {
  logTrace('remove gamestate by room_id')
  const filePaths = Object.values(getRoomFilePaths(room_id))

  try {
    filePaths.forEach(filePath => {
      try {
        unlinkSync(filePath)
        logTrace(`Removed file: ${filePath}`)
      } catch (error) {
        logTrace(`Could not remove file: ${filePath}`, error)
      }
    })
    logTrace(`All gamestate files removed for room_id: ${room_id}`)
  } catch (error) {
    logTrace(`Error removing gamestate files for room_id: ${room_id}`, error)
  }

  return { status: 'gamestate removed' }
}

export const removeAllGamestates_ = () => {
  logTrace('remove all gamestates')
  const results = {}

  roomsData.forEach(({ room_id }) => {
    try {
      results[room_id] = removeRoomGamestateById_(room_id)
    } catch (error) {
      logTrace(`Could not remove gamestate for room_id: ${room_id}`, error)
      results[room_id] = `Error removing gamestate: ${error.message}`
    }
  })

  return { status: 'all gamestates removed', results }
}

const modifyPlayersInRoom = (room_id, modifyFn) => {
  const filePath = getRoomFilePath(room_id, 'players')

  try {
    const rawData = readFileSync(filePath, { encoding: ENCODING })
    const gamestate = JSON.parse(rawData)

    modifyFn(gamestate.players)

    upsertGamestateFile(filePath, gamestate)
    return { status: 'success', room_id }
  } catch (error) {
    logTrace(`Could not modify players for room_id: ${room_id}`, error)
    return { status: 'error', room_id, message: error.message }
  }
}

export const removePlayerByToken_ = token => {
  logTrace(`remove player by id: ${token}`)
  const results = {}

  roomsData.forEach(({ room_id }) => {
    results[room_id] = modifyPlayersInRoom(room_id, players => {
      if (players[token]) {
        delete players[token]
      }
    })
  })

  return { status: `Player ${token} removal completed`, results }
}

export const removeAllPlayers_ = () => {
  logTrace('remove all players')
  const results = {}

  roomsData.forEach(({ room_id }) => {
    results[room_id] = modifyPlayersInRoom(room_id, players => {
      Object.keys(players).forEach(playerId => delete players[playerId])
    })
  })

  return { status: 'players removed from all rooms', results }
}

/* //TODO
export const readNohupByService = service => {
  logTrace(`readNohupByService ${service}`)

  const FE_PATH = process.env.FE_NOHUP_PATH || `${__dirname}/../../../onug-frontend/prod__nohup.txt`
  const BE_PATH_TXT = process.env.BE_NOHUP_PATH || `${__dirname}/../../prod__nohup.txt`
  const BE_PATH_CRASH = process.env.BE_CRASH_PATH || `${__dirname}/../prod__crash.js`

  let rawData = {}

  try {
    if (service === 'frontend') {
      rawData = readFileSync(FE_PATH, { encoding: ENCODING })
    } else {
      const logData = readFileSync(BE_PATH_TXT, { encoding: ENCODING })
      const crashData = readFileSync(BE_PATH_CRASH, { encoding: ENCODING })

      rawData = { logs: logData, crash: crashData }
    }
  } catch (error) {
    logTrace(`Could not read nohup for ${service}`, error)
  }

  return rawData
}
 */