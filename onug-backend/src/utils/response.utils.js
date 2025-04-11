import { ERROR } from '../constants'
import { logError } from '../log'


//TODO 
export const sendResponse = (ws, type, success, additionalData = {}) => {
    ws.send(JSON.stringify({ type, success, ...additionalData }))
}

export const handleError = (ws, room_id, error, customMessage = null) => {
    logError(`Error processing request in room: ${room_id}. Error: ${error.message}`)
    sendResponse(ws, ERROR, false, {
        message: customMessage || 'An error occurred while processing the request. Please try again.'
    })
}
