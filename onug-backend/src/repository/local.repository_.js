import { writeFileSync } from 'fs'
import { readFile } from 'fs/promises'
import { logError, logTrace } from '../log'

//TODO generate new functions for rooms_database.json

const FILE_PATH_TEMPLATE = `${__dirname}/../gamestate/`
const ROOM_GAMESTATE_CONFIG_FILE = room_id => `${FILE_PATH_TEMPLATE}/${room_id}/config.json`
const ROOM_GAMESTATE_PLAYERS_FILE = room_id => `${FILE_PATH_TEMPLATE}/${room_id}/players.json`
const ROOM_GAMESTATE_ROLES_FILE = room_id => `${FILE_PATH_TEMPLATE}/${room_id}/roles.json`
const ROOM_GAMESTATE_SCENE_FILE = room_id => `${FILE_PATH_TEMPLATE}/${room_id}/scene.json`
const ROOM_GAMESTATE_TABLE_FILE = room_id => `${FILE_PATH_TEMPLATE}/${room_id}/table.json`

const ENCODING = 'utf8'
const WRITE_OPTIONS = { flag: 'w' }

const upsertGamestateFile = async (filePath, data) => {
  try {
    writeFileSync(filePath, JSON.stringify(data, null, 2), WRITE_OPTIONS)
    logTrace(`${filePath} updated`)
  } catch (e) {
    logError(e)
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

export const upsertRoomConfig = async (room_id, config) => {
  const filePath = ROOM_GAMESTATE_CONFIG_FILE(room_id)
  await upsertGamestateFile(filePath, config)
}

export const readRoomConfig = async room_id => {
  const filePath = ROOM_GAMESTATE_CONFIG_FILE(room_id)
  return await readGamestateFile(filePath)
}

export const upsertRoomPlayers = async (room_id, players) => {
  const filePath = ROOM_GAMESTATE_PLAYERS_FILE(room_id)
  await upsertGamestateFile(filePath, players)
}

export const readRoomPlayers = async room_id => {
  const filePath = ROOM_GAMESTATE_PLAYERS_FILE(room_id)
  return await readGamestateFile(filePath)
}

export const upsertRoomRoles = async (room_id, roles) => {
  const filePath = ROOM_GAMESTATE_ROLES_FILE(room_id)
  await upsertGamestateFile(filePath, roles)
}

export const readRoomRoles = async room_id => {
  const filePath = ROOM_GAMESTATE_ROLES_FILE(room_id)
  return await readGamestateFile(filePath)
}

export const upsertRoomScene = async (room_id, scene) => {
  const filePath = ROOM_GAMESTATE_SCENE_FILE(room_id)
  await upsertGamestateFile(filePath, scene)
}

export const readRoomScene = async room_id => {
  const filePath = ROOM_GAMESTATE_SCENE_FILE(room_id)
  return await readGamestateFile(filePath)
}

export const upsertRoomTable = async (room_id, table) => {
  const filePath = ROOM_GAMESTATE_TABLE_FILE(room_id)
  await upsertGamestateFile(filePath, table)
}

export const readRoomTable = async room_id => {
  const filePath = ROOM_GAMESTATE_TABLE_FILE(room_id)
  return await readGamestateFile(filePath)
}
