const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const SECRET_KEY = uuidv4()
const roomsData = require('../data/rooms.json')
const { randomPlayerName } = require('../utils/name-generator')
const validator = require('../validator')
const { validateRoom } = validator
const { repository } = require('../repository')
const { logTrace, logInfo } = require('../log')
const { upsertRoomState } = repository

exports.joinRoom = async (req, res) => {
    const { body } = req
    logTrace(`Join-room endpoint triggered with request body: ${JSON.stringify(body)}`)

    const { room_id } = body
    const roomIndex = roomsData.findIndex((room) => room.room_id === room_id)

    if (roomIndex === -1) {
        return res.send({ message: 'Room does not exist.' })
    }

    const room = roomsData[roomIndex]
    const [roomIdValid, gameState] = await validateRoom(room_id)

    let playerName
    if (!roomIdValid) {
        if (room.available_names.length === 0) {
            return res.send({ message: 'No more available names. Room is full.' })
        }
        playerName = randomPlayerName(room.available_names)

        const newRoomState = {
            room_id: room_id,
            room_name: room.room_name,
            selected_cards: room.selected_cards,
            actions: [],
            action_log: [],
            players: [{ name: playerName, admin: true }],
            turn: 0,
            closed: false,
            available_names: room.available_names.filter(name => name !== playerName),
        }

        await upsertRoomState(newRoomState)
    } else {
        if (room.available_names.length === 0) {
            return res.send({ message: 'No more available names. Room is full.' })
        }

        playerName = randomPlayerName(gameState.available_names)

        gameState.players.push({
            name: playerName,
            admin: gameState.players.length === 0,
        })

        gameState.available_names = gameState.available_names.filter(name => name !== playerName)

        await upsertRoomState(gameState)
    }

    const playerToken = jwt.sign({ player_id: playerName, room_id: room_id }, SECRET_KEY, { expiresIn: '1h' })
    // TODO sandbox vs prod based on https://dev.to/alexmercedcoder/expressjs-handling-cross-origin-cookies-38l9
    //res.append('Set-Cookie', `playerToken=${playerToken} HttpOnly Path=/ Max-Age=3600`)
    res.cookie("token", playerToken, {
        // can only be accessed by server requests
        httpOnly: true,
        // path = where the cookie is valid
        path: "/",
        // domain = what domain the cookie is valid on
        domain: "localhost",
        // secure = only send cookie over https
        secure: false,
        // sameSite = only send cookie if the request is coming from the same origin
        sameSite: "strict", // "strict" | "lax" | "none" (secure must be true)
        // maxAge = how long the cookie is valid for in milliseconds
        maxAge: 3600000, // 1 hour
    });

    return res.send({
        success: true,
        message: 'Successfully joined',
        room_id,
        player_id: playerName,
    })
}
