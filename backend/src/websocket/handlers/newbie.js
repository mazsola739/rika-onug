import { v4 as uuidv4, validate } from 'uuid'
import { NEWBIE } from '../../constants'
import { logInfo } from '../../log'
import { sendMessage } from '../../utils'

export const newbie = (ws, message) => {
  const { token } = message
  logInfo(`newbie requested with ${JSON.stringify(message)}`)
  // reconnect, already existing token from client, no token on server side
  if (token && !ws.token && validate(token)) {
    ws.token = token
    sendMessage(ws, { type: NEWBIE, update: false, message: 'client successfully rejoined' })

    // TODO maybe? from gamestate, after redirected to lobby, redirect to the right path
  }

  if (!token || !ws.token || ws.token !== token) {
    // should validate token in EVERY OTHER request not here
    const newToken = uuidv4()
    ws.token = newToken
    logInfo(`newToken: ${newToken}`)

    return sendMessage(ws, { type: NEWBIE, update: true, token: newToken })
  }

  return
}
