const { NEWBIE } = require("../constant/ws")
const { v4: uuidv4 } = require("uuid")
const { logInfo } = require("../log")

exports.newbie = (ws, message) => {
  const { token } = message //TODO handle rejoin, user has valid token

  if (!token || !ws.token || ws.token !== token) {
    const newToken = uuidv4()
    ws.token = newToken
    logInfo(`newToken: ${newToken}`)

    return ws.send(JSON.stringify({ type: NEWBIE, token: newToken }))
  }

  return
}
