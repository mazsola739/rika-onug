import { appendFile } from 'fs/promises';

const LOG_LEVELS = {
    'ERROR': 'ERROR',
    'WARN' : 'WARN',
    'INFO' : 'INFO',
    'DEBUG': 'DEBUG',
    'TRACE': 'TRACE',
}
const LOG_LEVEL = process.env.ONUG_LOG_LEVEL || LOG_LEVELS.INFO
const logFilePath = `${__dirname}/../../logs/log_${Date.now()}.txt`

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

const writeToLogFile = async (message) => {
    let content = `${logTimestamp()}: ${message}
`
    await appendFile(logFilePath, content, (err) => {
        return console.error(err)
    })
}

export const logErrorWithStack = error => writeToLogFile(`[ERROR] ${error}. ${error.stack}`) && console.error(`${logTimestamp()}: [ERROR] ${error} ${error.stack}`)
export const logError = (message, items = '') => writeToLogFile(`[ERROR] ${message} ${items && JSON.stringify(items, null, 2)}`)  && console.error(`${logTimestamp()}: [ERROR] ${message} ${JSON.stringify(items, null, 2)}`)
export const logWarn  = (message, items = '') => writeToLogFile(`[WARN]  ${message} ${items && JSON.stringify(items, null, 2)}`)  && isLogLevelEnabled(LOG_LEVELS.WARN)  && console.warn(`${logTimestamp()}: [WARN] ${message} ${items && JSON.stringify(items, null, 2)}`)
export const logInfo  = (message, items = '') => writeToLogFile(`[INFO]  ${message} ${items && JSON.stringify(items, null, 2)}`)  && isLogLevelEnabled(LOG_LEVELS.INFO)  && console.info(`${logTimestamp()}: [INFO] ${message} ${items && JSON.stringify(items, null, 2)}`)
export const logDebug = (message, items = '') => writeToLogFile(`[DEBUG] ${message} ${items && JSON.stringify(items, null, 2)}`)  && isLogLevelEnabled(LOG_LEVELS.DEBUG) && console.info(`${logTimestamp()}: [DEBUG] ${message} ${items && JSON.stringify(items, null, 2)}`)
export const logTrace = (message, items = '') => writeToLogFile(`[TRACE] ${message} ${items && JSON.stringify(items, null, 2)}`)  && isLogLevelEnabled(LOG_LEVELS.TRACE) && console.info(`${logTimestamp()}: [TRACE] ${message} ${items && JSON.stringify(items, null, 2)}`)

logDebug('logFilePath', logFilePath)
logDebug('Log level is set to', LOG_LEVEL)
