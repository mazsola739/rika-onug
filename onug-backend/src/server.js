#!/usr/bin/env node
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import ViteExpress from 'vite-express'
import { apiRouter, internalServerError, pageNotFoundError } from './api'
import { logDebug } from './log'
import { godRouter } from './omnipotent/god'
import { stubRouter } from './omnipotent/stub'
import { websocketServer } from './websocket'

const app = express()
const PORT = 7654
const WEBSOCKET_PORT = 7655

websocketServer(WEBSOCKET_PORT)

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

// routes
app.use('/api', apiRouter)
app.use('/god', godRouter)
app.use('/stub', stubRouter)

// error handling
app.use(pageNotFoundError)
app.use(internalServerError)

// start server
ViteExpress.listen(app, PORT, () => logDebug(`Server is listening on port: ${PORT}`))
