const { repository } = require('../repository')
const { isTimeElapsed, getActionTime } = require('../utils/date-time')
const { readGameState, upsertRoomState } = repository
const { broadcast, websocketServerConnectionsPerRoom } = require('../websocket/connections')
const { HYDRATE_GAME_PLAY } = require('../constant/ws')
const { logTrace, logInfo, logError } = require('../log')

const tickTime = 250
let intervalId = null

exports.stopGamePlay = () => {
    // TODO stop with last scene automatically
    clearInterval(intervalId)
}

const tick = async (room_id) => {
    //logTrace('tick')
    const gameState = await readGameState(room_id)
    const from = gameState.startTime + gameState.cumSumPlayedMs
    const timeElapsed = isTimeElapsed(from, getActionTime(gameState))
    // TODO find related cards, push an interaction to them and play along, with specific ws sends
    const tokens = Object.keys(websocketServerConnectionsPerRoom[room_id])
    tokens.forEach(token => gameState.scenes[gameState.scene])

    if (!timeElapsed) return

    if ( !gameState.scenes[gameState.scene]+1 ) this.stopGamePlay()
    // TODO move to vote state

    gameState.cumSumPlayedMs = gameState.cumSumPlayedMs + getActionTime(gameState) * 1000
    gameState.scene = gameState.scene + 1


    await upsertRoomState(gameState)
    const nextScene = {
        type: HYDRATE_GAME_PLAY,
        scene: gameState.scene,
        text: gameState.scenes[gameState.scene],
    }
    logTrace(`broadcast next scene : ${nextScene}`)
    broadcast(gameState.room_id, nextScene)
}


exports.startGamePlay = room_id => {
    intervalId = setInterval(() => tick(room_id), tickTime)
}


