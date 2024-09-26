import { API_HOST } from 'constant'
import { observer } from 'mobx-react-lite'
import { useState, useCallback } from 'react'
import { StyledGod, LeftSide, GamestatesContainer, GodTitle, FormContainer, InputContainer, Label, Input, ButtonsContainer, Button, WSContainer, MetaContainer, RightSide, ResponseContainer, ResponsePre } from './God.styles'

//TODO hack mode (send message to server)
const gamestates = 'gamestates'
const LABEL_ROOM_ID = 'room_id:'
const LABEL_TOKEN = 'token:'
const LABEL_MESSAGE = 'message:'
const CHECK_GAMESTATES = 'Check gamestates'
const CHECK_GAMESTATE_BY_ROOM_ID = 'Check gamestate by room_id'
const DELETE_ALL_GAMESTATES = 'Delete all gamestates'
const DELETE_GAMESTATE_BY_ROOM_ID = 'Delete gamestate by room_id'
const RE_INIT_ALL_GAMESTATES = 'Re init all gamestates'
const WS = 'WS'
const CHECK_CONNECTIONS = 'Check connections'
const REMOVE_PLAYER_BY_TOKEN = 'Remove player by token'
const REMOVE_ALL_PLAYERS = 'Remove all player (drop connection)'
const BROADCAST_TO_ALL = 'Broadcast to all'
const BROADCAST_TO_ALL_IN_ROOM = 'Broadcast to all in room by room_id'
const SEND_MESSAGE_TO_PLAYER = 'Send message to player by token'
const META = 'Meta'
const LIST_ONUG_ENV_VARS = 'List ONUG_* env vars'
const DELETE_ALL_OLD_LOG_FILES = 'Delete all old log files'
const RESPONSE = 'Response'

// TODO security, protected routing and sending a secure GOD token

export const God: React.FC = observer(() => {
  const [response, setResponse] = useState({
    serverResponse: 'will be populated here',
  })
  const [roomId, setRoomId] = useState('')
  const [token, setToken] = useState('')
  const [message, setMessage] = useState({ type: 'REDIRECT', path: '/lobby' })

  const checkGamestates = async () => {
    const res = await fetch(`${API_HOST}/god/check-gamestates`)
    const json = await res.json()
    setResponse(json)
  }

  const checkGamestateByRoomId = async () => {
    const res = await fetch(
      `${API_HOST}/god/check-gamestate-by-room-id?room_id=${roomId}`
    )
    const json = await res.json()
    setResponse(json)
  }

  const deleteAllGamestates = async () => {
    const res = await fetch(`${API_HOST}/god/delete-all-gamestates`)
    const json = await res.json()
    setResponse(json)
  }

  const deleteGamestateByRoomId = async () => {
    const res = await fetch(
      `${API_HOST}/god/delete-gamestate-by-room-id?room_id=${roomId}`
    )
    const json = await res.json()
    setResponse(json)
  }

  const reInitAllGamestates = async () => {
    const res = await fetch(`${API_HOST}/god/re-init-all-gamestates`)
    const json = await res.json()
    setResponse(json)
  }

  const checkConnections = async () => {
    const res = await fetch(`${API_HOST}/god/check-connections`)
    const json = await res.json()
    setResponse(json)
  }

  const removePlayerByToken = async () => {
    const res = await fetch(
      `${API_HOST}/god/delete-player-by-token?token=${token}`
    )
    const json = await res.json()
    setResponse(json)
  }

  const removeAllPlayers = async () => {
    const res = await fetch(`${API_HOST}/god/delete-all-players`)
    const json = await res.json()
    setResponse(json)
  }

  // {"type": "MESSAGE", "message": "hi there, this is a broadcast message"}
  // examples:
  // {"type": "REDIRECT", "path": "/stub"}
  const broadcastToAll = useCallback(async () => {
    const res = await fetch(`${API_HOST}/god/broadcast-to-all`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    })
    const json = await res.json()
    setResponse(json)
  }, [message, setResponse])

  const broadcastToAllInRoom = useCallback(async () => {
    const res = await fetch(`${API_HOST}/god/broadcast-to-all-in-room`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message, room_id: roomId }),
    })
    const json = await res.json()
    setResponse(json)
  }, [token, message, setResponse, roomId])

  const sendMessageToPlayer = useCallback(async () => {
    const res = await fetch(`${API_HOST}/god/send-message-to-player`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message, token: token }),
    })
    const json = await res.json()
    setResponse(json)
  }, [token, message, setResponse])

  const listOnugEnvVars = async () => {
    const res = await fetch(`${API_HOST}/god/list-onug-env-vars`)
    const json = await res.json()
    setResponse(json)
  }

  const deleteAllOldLogFiles = async () => {
    const res = await fetch(`${API_HOST}/god/delete-all-old-log-files`)
    const json = await res.json()
    setResponse(json)
  }

  const setMessageHandler = (value: string) => {
    try {
      return setMessage(JSON.parse(value))
    } catch (error) {
      // shhhhhh, no need to do anything, we just try to
    }
  }

  return (
    <StyledGod>
      <LeftSide>
        <GamestatesContainer>
          <GodTitle>{gamestates}</GodTitle>
          <FormContainer>
            <InputContainer>
              <Label htmlFor="room_id">{LABEL_ROOM_ID}</Label>
              <Input type="text" id="room_id" name="room_id" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="token">{LABEL_TOKEN}</Label>
              <Input type="text" id="token" name="token" value={token} onChange={(e) => setToken(e.target.value)} />
            </InputContainer>
          </FormContainer>
          <ButtonsContainer>
            <Button onClick={checkGamestates}>{CHECK_GAMESTATES}</Button>
            <Button onClick={checkGamestateByRoomId}>{CHECK_GAMESTATE_BY_ROOM_ID}</Button>
            <Button onClick={deleteAllGamestates}>{DELETE_ALL_GAMESTATES}</Button>
            <Button onClick={deleteGamestateByRoomId}>{DELETE_GAMESTATE_BY_ROOM_ID}</Button>
            <Button onClick={reInitAllGamestates}>{RE_INIT_ALL_GAMESTATES}</Button>
          </ButtonsContainer>
        </GamestatesContainer>

        <WSContainer>
          <GodTitle>{WS}</GodTitle>
          <FormContainer>
            <InputContainer>
              <Label htmlFor="message">{LABEL_MESSAGE}</Label>
              <textarea id="message" name="message" defaultValue={JSON.stringify(message)} onChange={(event) => setMessageHandler(event.target.value)} />
            </InputContainer>
          </FormContainer>
          <ButtonsContainer>
            <Button onClick={checkConnections}>{CHECK_CONNECTIONS}</Button>
            <Button onClick={removeAllPlayers}>{REMOVE_ALL_PLAYERS}</Button>
            <Button onClick={removePlayerByToken}>{REMOVE_PLAYER_BY_TOKEN}</Button>
            <Button onClick={broadcastToAll}>{BROADCAST_TO_ALL}</Button>
            <Button onClick={broadcastToAllInRoom}>{BROADCAST_TO_ALL_IN_ROOM}</Button>
            <Button onClick={sendMessageToPlayer}>{SEND_MESSAGE_TO_PLAYER}</Button>
          </ButtonsContainer>
        </WSContainer>

        <MetaContainer>
          <GodTitle>{META}</GodTitle>
          <ButtonsContainer>
            <Button onClick={listOnugEnvVars}>{LIST_ONUG_ENV_VARS}</Button>
            <Button onClick={deleteAllOldLogFiles}>{DELETE_ALL_OLD_LOG_FILES}</Button>
          </ButtonsContainer>
        </MetaContainer>
      </LeftSide>

      <RightSide>
        <GodTitle>{RESPONSE}</GodTitle>
        <ResponseContainer>
          <ResponsePre>{`${JSON.stringify(response, null, 4)}`}</ResponsePre>
        </ResponseContainer>
      </RightSide>
    </StyledGod>
  )
})
