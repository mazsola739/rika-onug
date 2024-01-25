const { repository } = require('../repository')
const { isTimeElapsed, getActionTime } = require('../utils/date-time')
const { readGameState, upsertRoomState } = repository
const { broadcast, sendInteractionSceneToPlayer } = require('../websocket/connections')
const { HYDRATE_GAME_PLAY } = require('../constant/ws')
const { logTrace, logInfo } = require('../log')

const tickTime = 250
let intervalId = null

exports.stopGamePlay = () => {
    clearInterval(intervalId)
}

const flagInteractionScenesAsSent = async (gameState) => {
    gameState.interactionScenes[gameState.scene_number] = gameState.interactionScenes?.[gameState.scene_number].map(interactionScene => {
        return {...interactionScene, sent: true}
    })
    await upsertRoomState(gameState)
}
const updateScene = async (gameState) => {
    gameState.cumSumPlayedMs = gameState.cumSumPlayedMs + getActionTime(gameState) * 1000
    gameState.scene_number = gameState.scene_number + 1
    await upsertRoomState(gameState)
}

const tick = async (room_id) => {
    logTrace('tick')
    const gameState = await readGameState(room_id)

    sendInteractionSceneToPlayer(gameState)
    await flagInteractionScenesAsSent(gameState, gameState)

    const from = gameState.startTime + gameState.cumSumPlayedMs
    const timeElapsed = isTimeElapsed(from, getActionTime(gameState))
    logTrace(`time ${timeElapsed ? 'elapsed' : 'not yet elapsed'} for this scene`)

    if (!timeElapsed) return

    if ( !gameState.scenes[gameState.scene_number+1] ) return this.stopGamePlay()
    // TODO move to vote state

    await updateScene(gameState)

    const nextScene = {
        type: HYDRATE_GAME_PLAY,
        scene_number: gameState.scene_number,
        text: gameState.scenes[gameState.scene_number],
    }
    logTrace(`broadcast next scene : ${nextScene}`)
    broadcast(gameState.room_id, nextScene)
}


exports.startGamePlay = room_id => {
    intervalId = setInterval(() => tick(room_id), tickTime)
}


