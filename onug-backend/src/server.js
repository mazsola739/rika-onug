const express = require('express')
const {createRoomController} = require("./lambda/create-room/handler")
const {createEventFromRequest} = require("./util/express-lambda-converter")
const {joinRoomController} = require("./lambda/join-room/handler");
const {actionController} = require("./lambda/action/handler");
const {hydrateController} = require("./lambda/hydrate/handler");
const {readyController} = require("./lambda/ready/handler");
const {errorController} = require("./lambda/error/handler");

const app = express()
const PORT = 7654

app.use(express.json())
app.use(express.urlencoded())

app.post('/', (req, res) => {
    const {body} = req
    const {route} = body

    let response
    if (route === 'create-room')
        response = createRoomController(createEventFromRequest(body))
    else if (route === 'join-room')
        response = joinRoomController(createEventFromRequest(body))
    else if (route === 'action')
        response = actionController(createEventFromRequest(body))
    else if (route === 'hydrate')
        response = hydrateController(createEventFromRequest(body))
    else if (route === 'ready')
        response = readyController(createEventFromRequest(body))
    else
        response = errorController(createEventFromRequest(body))

    res.status(response.statusCode)
    res.send(JSON.stringify(response.body))
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})