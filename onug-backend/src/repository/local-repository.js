const { writeFileSync } = require('fs')
const { readFile } = require('fs/promises')
const { logError, logTrace } = require('../log')
const upsertRoomState = async (state) => {
  logTrace('upsertRoomState')
  const filePath = `${__dirname}/../database/room_${state.room_id}_gamestate.json`
  const roomState = JSON.stringify(state, null, 4)
  const options = { flag: 'w' }
  try {
    writeFileSync(filePath, roomState, options)
    logTrace('room udpated')
  } catch (e) {
    logError(e)
  }
}

const readGameState = async (room_id) => {
  logTrace('read game state')
  const filePath = `${__dirname}/../database/room_${room_id}_gamestate.json`
  const options = { encoding: 'utf8' }
  try {
    const data = await readFile(filePath, options)
    return JSON.parse(data)
  } catch (e) {
    logError(`###>>> READ_GAME_STATE_ERROR
###>>> ${e}`)
    return
  }
}

module.exports = {
  upsertRoomState,
  readGameState,
}
