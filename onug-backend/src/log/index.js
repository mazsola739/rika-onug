const LOG_LEVELS = {
    'ERROR': 'ERROR',
    'WARN' : 'WARN',
    'INFO' : 'INFO',
    'DEBUG': 'DEBUG',
    'TRACE': 'TRACE',
}
const LOG_LEVEL = process.env.ONUG_LOG_LEVEL || LOG_LEVELS.INFO

console.log(`Log level is set to ${LOG_LEVEL}`)

const isLogLevelEnabled = (logLevel) => {
    switch (logLevel) {
        case LOG_LEVELS.ERROR: return true
        case LOG_LEVELS.WARN:  return (LOG_LEVEL === LOG_LEVELS.WARN || LOG_LEVEL === LOG_LEVELS.INFO || LOG_LEVEL === LOG_LEVELS.DEBUG || LOG_LEVEL === LOG_LEVELS.TRACE)
        case LOG_LEVELS.INFO:  return (LOG_LEVEL === LOG_LEVELS.INFO || LOG_LEVEL === LOG_LEVELS.DEBUG || LOG_LEVEL === LOG_LEVELS.TRACE)
        case LOG_LEVELS.DEBUG: return (LOG_LEVEL === LOG_LEVELS.DEBUG || LOG_LEVEL === LOG_LEVELS.TRACE)
        case LOG_LEVELS.TRACE: return (LOG_LEVEL === LOG_LEVELS.TRACE)
        default: {
            console.warn(`log level is not set to a valid value. Please check your ONUG_LOG_LEVEL env variable. tried to log a: [${logLevel}], LOG_LEVEL is set to: [${LOG_LEVEL}]`)
            return false
        }
    }
}

const logTimestamp = () => new Date().toISOString()
const logError = message => isLogLevelEnabled(LOG_LEVELS.ERROR) && console.error(`${logTimestamp()}: [ERROR] ${message}`)
const logWarn  = message => isLogLevelEnabled(LOG_LEVELS.WARN) && console.warn(`${logTimestamp()}: [WARN] ${message}`)
const logInfo  = message => isLogLevelEnabled(LOG_LEVELS.INFO) && console.info(`${logTimestamp()}: [INFO] ${message}`)
const logDebug = message => isLogLevelEnabled(LOG_LEVELS.DEBUG) && console.info(`${logTimestamp()}: [DEBUG] ${message}`)
const logTrace = message => isLogLevelEnabled(LOG_LEVELS.TRACE) && console.info(`${logTimestamp()}: [TRACE] ${message}`)

module.exports = {
    logError,
    logWarn,
    logInfo,
    logDebug,
    logTrace,
}