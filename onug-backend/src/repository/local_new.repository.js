import { writeFileSync, readFileSync, unlinkSync } from 'fs'
import { ROOM_NAMES } from '../constants'
import roomsData from '../data/rooms_new.json'
import configData from '../data/gamestate_roomState.json'
import playersData from '../data/gamestate_players.json'
import rolesData from '../data/gamestate_roles.json'
import sceneData from '../data/gamestate_scene.json'
import tableData from '../data/gamestate_table.json'
import { logError, logErrorWithStack, logTrace } from '../log'
import { webSocketServerConnectionsPerRoom } from '../utils/connections.utils'

const FILE_PATH_TEMPLATE = `${__dirname}/../gamestate/`
const ROOM_GAMESTATE_FILE = (room_id, type) => `${FILE_PATH_TEMPLATE}/${room_id}/${type}.json`
const ROOM_GAMESTATE_FILE_TYPES = ['roomState', 'players', 'roles', 'scene', 'table']
const DEFAULT_DATA_MAP = {
  roomState: configData,
  players: playersData,
  roles: rolesData,
  scene: sceneData,
  table: tableData
}
const ENCODING = 'utf8'
const WRITE_OPTIONS = { flag: 'w' }

export const upsertRoomState_ = async (room_id, type, state) => {
  logTrace(`upsertRoomState: room_id=${room_id}, type=${type}`)
  const filePath = ROOM_GAMESTATE_FILE(room_id, type)
  const roomState = JSON.stringify(state, null, 2)

  try {
    writeFileSync(filePath, roomState, WRITE_OPTIONS)
    logTrace(`Room state updated for room_id=${room_id}, type=${type}`)
  } catch (e) {
    logError(`Failed to update room state for room_id=${room_id}, type=${type}`, e)
  }
}

export const readGamestate_ = async (room_id, type) => {
  logTrace(`readGamestate: room_id=${room_id}, type=${type}`)
  const filePath = ROOM_GAMESTATE_FILE(room_id, type)

  try {
    const data = readFileSync(filePath, { encoding: ENCODING })
    return JSON.parse(data)
  } catch (error) {
    logError(`Failed to read gamestate for room_id=${room_id}, type=${type}`, error)
    return null
  }
}

export const readAllGamestates_ = async () => {
  logTrace('readAllGamestates')
  const gamestates = {}
  for (const room_id of ROOM_NAMES) {
    const consolidatedGamestate = {}

    for (const type of ROOM_GAMESTATE_FILE_TYPES) {
      const filePath = ROOM_GAMESTATE_FILE(room_id, type)

      try {
        const rawData = readFileSync(filePath, { encoding: ENCODING })
        consolidatedGamestate[type] = JSON.parse(rawData)
      } catch (error) {
        logTrace(`Could not read ${type} for room_id=${room_id}`, error)
        consolidatedGamestate[type] = null
      }
    }

    gamestates[room_id] = consolidatedGamestate
  }
  return gamestates
}

export const readGamestateByRoomId_ = async room_id => {
  logTrace('read gamestate by room_id')
  const consolidatedGamestate = {}

  for (const type of ROOM_GAMESTATE_FILE_TYPES) {
    const filePath = ROOM_GAMESTATE_FILE(room_id, type)

    try {
      const rawData = await readFileSync(filePath, { encoding: ENCODING })
      consolidatedGamestate[type] = JSON.parse(rawData)
    } catch (error) {
      logTrace(`Could not read ${type} for room_id ${room_id}`, error)
      consolidatedGamestate[type] = `No ${type} found for room_id: ${room_id}`
    }
  }

  return consolidatedGamestate
}

export const removeAllGamestates_ = async () => {
  logTrace('removeAllGamestates')
  for (const room_id of ROOM_NAMES) {
    for (const type of ROOM_GAMESTATE_FILE_TYPES) {
      const filePath = ROOM_GAMESTATE_FILE(room_id, type)

      try {
        unlinkSync(filePath)
        logTrace(`Removed ${type} for room_id=${room_id}`)
      } catch (error) {
        logTrace(`Could not remove ${type} for room_id=${room_id}`, error)
      }
    }
  }
  return { status: 'All gamestates removed for all rooms' }
}

export const removeRoomGamestateById_ = async room_id => {
  logTrace(`removeRoomGamestateById: room_id=${room_id}`)
  for (const type of ROOM_GAMESTATE_FILE_TYPES) {
    const filePath = ROOM_GAMESTATE_FILE(room_id, type)

    try {
      unlinkSync(filePath)
      logTrace(`Removed ${type} for room_id=${room_id}`)
    } catch (error) {
      logTrace(`Could not remove ${type} for room_id=${room_id}`, error)
    }
  }
  return { status: `All gamestates removed for room_id=${room_id}` }
}

export const removeAllPlayers_ = async () => {
  logTrace('removeAllPlayers')
  const gamestates = {}

  for (const room_id of ROOM_NAMES) {
    const filePath = ROOM_GAMESTATE_FILE(room_id, 'players')

    try {
      const newPlayers = {}
      writeFileSync(filePath, JSON.stringify(newPlayers, null, 2), WRITE_OPTIONS)
      gamestates[room_id] = newPlayers
      logTrace(`Removed all players for room_id=${room_id}`)
    } catch (error) {
      logTrace(`Could not remove players for room_id=${room_id}`, error)
      gamestates[room_id] = null
    }
  }

  return { status: 'Players removed from all rooms', gamestates }
}

export const removePlayerByToken_ = async token => {
  logTrace(`removePlayerByToken: token=${token}`)
  const gamestates = {}

  for (const room_id of ROOM_NAMES) {
    const filePath = ROOM_GAMESTATE_FILE(room_id, 'players')

    try {
      const rawData = readFileSync(filePath, { encoding: ENCODING })
      const players = JSON.parse(rawData)

      if (players[token]) {
        delete players[token]
        writeFileSync(filePath, JSON.stringify(players, null, 2), WRITE_OPTIONS)
        gamestates[room_id] = players
        delete webSocketServerConnectionsPerRoom[room_id][token]
        logTrace(`Removed player with token=${token} from room_id=${room_id}`)
      }
    } catch (error) {
      logTrace(`Could not remove player with token=${token} for room_id=${room_id}`, error)
      gamestates[room_id] = null
    }
  }

  return { status: `Player with token=${token} removed from all rooms`, gamestates }
}

export const reInitializeAllGamestates_ = async () => {
  try {
    logTrace('reInitializeAllGamestates')
    const gamestates = {}

    for (const room_id of ROOM_NAMES) {
      const roomDetails = roomsData.find(room => room.room_id === room_id) || { room_id, room_name: 'Unknown Room' }
      const consolidatedGamestate = {}

      for (const type of ROOM_GAMESTATE_FILE_TYPES) {
        const filePath = ROOM_GAMESTATE_FILE(room_id, type)

        if (type === 'roomState') {
          consolidatedGamestate[type] = {
            room_id: roomDetails.room_id,
            room_name: roomDetails.room_name,
            ...DEFAULT_DATA_MAP[type]
          }
        } else {
          consolidatedGamestate[type] = DEFAULT_DATA_MAP[type] || {}
        }

        const freshData = JSON.stringify(consolidatedGamestate[type], null, 2)
        try {
          writeFileSync(filePath, freshData, WRITE_OPTIONS)
          logTrace(`Regenerated and saved fresh ${type} data for room_id=${room_id}`)
        } catch (error) {
          logError(`Failed to write ${type} data for room_id=${room_id}`, error)
        }
      }

      gamestates[room_id] = consolidatedGamestate
    }

    return { status: 'Rooms re-initialized', gamestates }
  } catch (error) {
    logErrorWithStack(error)
    return { status: 'ERROR during re-initializing gamestates', error }
  }
}

export const readNohupByService_ = async service => {
  logTrace(`readNohupByService ${service}`)

  const FE_PATH = `${__dirname}/../../../onug-frontend/prod__nohup.txt`
  const BE_PATH_TXT = `${__dirname}/../../prod__nohup.txt`
  const BE_PATH_CRASH = `${__dirname}/../prod__crash.js`

  let rawData = {}

  try {
    if (service === 'frontend') {
      rawData = await readFileSync(FE_PATH, { encoding: ENCODING })
    } else {
      const logData = await readFileSync(BE_PATH_TXT, { encoding: ENCODING })
      const crashData = await readFileSync(BE_PATH_CRASH, { encoding: ENCODING })

      rawData = { logs: logData, crash: crashData }
    }
  } catch (error) {
    logTrace(`Could not read nohup for ${service}`, error)
  }

  return rawData
}
