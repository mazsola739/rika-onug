const { SIMPLE, DOUBLE } = require("../constant/actionTimeType")

exports.getActionTime = gameState => {
    if (gameState.actionTimeTypeForScene === SIMPLE) return gameState.actionTime
    if (gameState.actionTimeTypeForScene === DOUBLE) return gameState.actionTime * 2
    return gameState.actionTime
}

exports.isTimeElapsed = (fromTimeStamp, durationInSeconds) => {
    const now = Date.now()
    const totalSecondsElapsed = ( now - fromTimeStamp ) / 1000
        return totalSecondsElapsed >= durationInSeconds
}