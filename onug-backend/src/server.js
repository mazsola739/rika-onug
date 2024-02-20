import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { pageNotFoundError, internalServerError, apiRouter } from './api';
import { logDebug } from './log';
import { websocketServer } from './websocket';
import { godRouter } from './god';
import { stubRouter } from './stub';
import ViteExpress from "vite-express";


const app = express()
const PORT = 7654
const WEBSOCKET_PORT = 7655

websocketServer(WEBSOCKET_PORT)

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

// API routing
app.use('/api', apiRouter)
app.use('/god', godRouter)
app.use('/stub', stubRouter)

// Error handling
app.use(pageNotFoundError)
app.use(internalServerError)

ViteExpress.listen(app, PORT, () =>
    logDebug(`Server is listening on port: ${PORT}`)
);
