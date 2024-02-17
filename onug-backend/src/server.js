const express = require("express")
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { pageNotFoundError, internalServerError, apiRouter } = require("./api")
const { logDebug } = require('./log')
const { websocketServer } = require('./websocket')
const { godRouter } = require("./god")
const { stubRouter } = require("./stub")

const app = express()
const PORT = 7654
const WEBSOCKET_PORT = 7655

websocketServer(WEBSOCKET_PORT)

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
/* app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
 */

// API routing
app.use('/api', apiRouter)
app.use('/god', godRouter)
app.use('/stub', stubRouter)

// Error handling
app.use(pageNotFoundError)
app.use(internalServerError)

app.listen(PORT, () => {
    logDebug(`Server is listening on port: ${PORT}`)
})
