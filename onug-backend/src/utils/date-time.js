const { SIMPLE, DOUBLE } = require("../constant/actionTimeType")

exports.getActionTime = gameState => {
    if (gameState.scenes[gameState.scene_number].actionTimeType === SIMPLE) return gameState.actionTime
    if (gameState.scenes[gameState.scene_number].actionTimeType === DOUBLE) return gameState.actionTime * 2
    return gameState.actionTime
}

exports.isTimeElapsed = (fromTimeStamp, durationInSeconds) => {
    const now = Date.now()
    const totalSecondsElapsed = ( now - fromTimeStamp ) / 1000
        return totalSecondsElapsed >= durationInSeconds
}