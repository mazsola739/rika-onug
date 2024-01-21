const { repository } = require('../repository')
const { isTimeElapsed, getActionTime } = require('../utils/date-time')
const { readGameState, upsertRoomState } = repository
const { broadcast, sendInteractionSceneToPlayer } = require('../websocket/connections')
const { HYDRATE_GAME_PLAY } = require('../constant/ws')
const { logTrace, logInfo } = require('../log')
const { interactionSceneBuilder } = require('./interaction-scene-builder')

const tickTime = 250
let intervalId = null

exports.stopGamePlay = () => {
    clearInterval(intervalId)
}

const flagInteractionScenesAsSent = async (newGameState) => {
    newGameState.interactionScenes[newGameState.scene_number] = newGameState.interactionScenes?.[newGameState.scene_number].map(interactionScene => {
        return {...interactionScene, sent: true}
    })
    await upsertRoomState(newGameState)
}
const updateScene = async (newGameState) => {
    newGameState.cumSumPlayedMs = newGameState.cumSumPlayedMs + getActionTime(newGameState) * 1000
    newGameState.scene_number = newGameState.scene_number + 1
    await upsertRoomState(newGameState)
}

const tick = async (room_id) => {
    logTrace('tick')
    const gameState = await readGameState(room_id)

    const newGameState = interactionSceneBuilder(gameState)
    sendInteractionSceneToPlayer(newGameState)
    await flagInteractionScenesAsSent(newGameState, gameState)

    const from = newGameState.startTime + newGameState.cumSumPlayedMs
    const timeElapsed = isTimeElapsed(from, getActionTime(newGameState))
    logTrace(`time ${timeElapsed ? 'elapsed' : 'not yet elapsed'} for this scene`)

    if (!timeElapsed) return

    if ( !newGameState.scenes[newGameState.scene_number+1] ) return this.stopGamePlay()
    // TODO move to vote state

    await updateScene(newGameState)

    const nextScene = {
        type: HYDRATE_GAME_PLAY,
        scene_number: newGameState.scene_number,
        text: newGameState.scenes[newGameState.scene_number],
    }
    logTrace(`broadcast next scene : ${nextScene}`)
    broadcast(newGameState.room_id, nextScene)
}


exports.startGamePlay = room_id => {
    intervalId = setInterval(() => tick(room_id), tickTime)
}


