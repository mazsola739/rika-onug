import { readFile } from 'fs/promises'
import { ROOM_NAMES } from '../constants'
import { roomsJson, gamestateJson } from '../data'
import { logError, logErrorWithStack, logTrace } from '../log'
import { webSocketServerConnectionsPerRoom } from '../utils/connections.utils'
import { DynamoDBClient, GetItemCommand, PutItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

const client = new DynamoDBClient({ region: 'us-west-2', endpoint: "http://localhost:8000" }) // TODO check, update

const ENCODING = 'utf8'

// TODO CHECK
export const upsertRoomState = async state => {
  logTrace('upsertRoomState')

  try {
    const item = marshall(state)

    const writeCommand = new PutItemCommand({
      TableName: 'gamestate',
      Item: item,
    })
    const results = await client.send(writeCommand)

    logTrace(`room updated, results: ${results}`)
  } catch (e) {
    logError(e)
  }
}

export const readGamestate = async room_id => {
  logTrace('read gamestate')

  try {
    const readCommand = new GetItemCommand({
      TableName: 'gamestate',
      Key: marshall({ room_id }),
    })
    const result = await client.send(readCommand)

    if (result.Item) {
      return unmarshall(result.Item)
    } else {
      logTrace(`No gamestate found for room_id: ${room_id}`)
      return null
    }
  } catch (error) {
    logError(`###>>> READ_GAMESTATE_ERROR ###>>>`, error)
    return null
  }
}

export const readAllGamestates = async () => {
  logTrace('read all gamestates')
  const gamestates = {}

  for (let i = 0; i < ROOM_NAMES.length; i++) {
    const room_id = ROOM_NAMES[i]

    try {
      const readCommand = new GetItemCommand({
        TableName: 'gamestate',
        Key: marshall({ room_id }),
      })
      const result = await client.send(readCommand)

      if (result.Item) {
        gamestates[room_id] = unmarshall(result.Item)
      } else {
        logTrace(`No gamestate found for room_id: ${room_id}`)
        gamestates[room_id] = `No gamestate found for room_id: ${room_id}`
      }
    } catch (error) {
      logTrace(`Could not read gamestate for room_id: ${room_id}`, error)
      gamestates[room_id] = `Error reading gamestate for room_id: ${room_id}`
    }
  }

  return gamestates
}

export const readGamestateByRoomId = async room_id => {
  logTrace('read gamestate by room_id')

  try {
    const readCommand = new GetItemCommand({
      TableName: 'gamestate',
      Key: marshall({ room_id }),
    })
    const result = await client.send(readCommand)

    if (result.Item) {
      const unmarshalledData = unmarshall(result.Item)
      return { [room_id]: unmarshalledData }
    } else {
      logTrace(`No gamestate found for room_id: ${room_id}`)
      return { [room_id]: `No gamestate found for room_id: ${room_id}` }
    }
  } catch (error) {
    logTrace(`Could not read gamestate for room_id: ${room_id}`, error)
    return { [room_id]: `Error reading gamestate for room_id: ${room_id}` }
  }
}

export const removeAllGamestates = async () => {
  logTrace('remove all gamestates')

  for (let i = 0; i < ROOM_NAMES.length; i++) {
    const room_id = ROOM_NAMES[i]

    try {
      const deleteCommand = new DeleteItemCommand({
        TableName: 'gamestate',
        Key: marshall({ room_id }),
      })
      await client.send(deleteCommand)
    } catch (error) {
      logTrace(`Could not remove gamestate for room_id: ${room_id}`, error)
    }
  }

  return { status: 'gamestates removed' }
}

export const removeRoomGamestateById = async room_id => {
  logTrace('remove gamestate by room_id')

  try {
    const deleteCommand = new DeleteItemCommand({
      TableName: 'gamestate',
      Key: marshall({ room_id }),
    })
    await client.send(deleteCommand)
  } catch (error) {
    logTrace(`Could not remove gamestate for room_id: ${room_id}`, error)
  }

  return { status: 'gamestate removed' }
}

export const removeAllPlayers = async () => {
  logTrace('remove all players')
  const gamestates = {}

  for (let i = 0; i < ROOM_NAMES.length; i++) {
    const room_id = ROOM_NAMES[i]

    try {
      const readCommand = new GetItemCommand({
        TableName: 'gamestate',
        Key: marshall({ room_id }),
      })
      const result = await client.send(readCommand)

      if (result.Item) {
        const newGamestate = unmarshall(result.Item)
        Object.keys(newGamestate.players).forEach(token => delete newGamestate.players[token])

        await upsertRoomState(newGamestate)
        gamestates[room_id] = newGamestate
      } else {
        logTrace(`No gamestate found for room_id: ${room_id}`)
        gamestates[room_id] = `No gamestate found for room_id: ${room_id}`
      }
    } catch (error) {
      logTrace(`Could not remove players for room_id: ${room_id}`, error)
      gamestates[room_id] = `Error removing players for room_id: ${room_id}`
    }
  }

  return { status: 'players removed from rooms', gamestates }
}

export const removePlayerByToken = async token => {
  logTrace('remove player by token')
  const gamestates = {}

  for (let i = 0; i < ROOM_NAMES.length; i++) {
    const room_id = ROOM_NAMES[i]

    try {
      const readCommand = new GetItemCommand({
        TableName: 'gamestate',
        Key: marshall({ room_id }),
      })
      const result = await client.send(readCommand)

      if (result.Item) {
        const newGamestate = unmarshall(result.Item)

        if (newGamestate.players[token]) {
          delete newGamestate.players[token]
          await upsertRoomState(newGamestate)
          gamestates[room_id] = newGamestate
          delete webSocketServerConnectionsPerRoom[room_id][token]
        }
      } else {
        logTrace(`No gamestate found for room_id: ${room_id}`)
        gamestates[room_id] = `No gamestate found for room_id: ${room_id}`
      }
    } catch (error) {
      logTrace(`Could not remove player for room_id: ${room_id}`, error)
      gamestates[room_id] = `Error removing player for room_id: ${room_id}`
    }
  }

  return { status: 'player removed from rooms', gamestates }
}

export const reInitializeAllGamestates = async () => {
  try {
    logTrace('Re-init all gamestates')
    const gamestates = {}

    for (const { room_id, room_name } of roomsJson) {
      const roomGamestate = { room_id, room_name, ...gamestateJson }
      await upsertRoomState(roomGamestate)
      gamestates[room_id] = roomGamestate
    }

    return { status: 'rooms re-initialized', gamestates }
  } catch (error) {
    logErrorWithStack(error)
  }

  return { status: 'ERROR during re-initializing gamestates' }
}

export const readNohupByService = async service => {
  logTrace(`readNohupByService ${service}`)

  const FE_PATH = `${__dirname}/../../../frontend/prod__nohup.txt`
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
