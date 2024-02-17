/* eslint-disable prettier/prettier */
import { observer } from 'mobx-react-lite'
import { useCallback, useState } from 'react'
import {
  Button,
  ButtonsContainer,
  GameStatesContainer,
  FormContainer,
  InputContainer,
  GodTitle,
  Input,
  Label,
  LeftSide,
  MetaContainer,
  ResponseContainer,
  ResponsePre,
  RightSide,
  StyledGod,
  WSContainer,
} from './God.styles'
import { Icon } from 'components'
import { API_SERVER_HOST } from 'constant'

const GAMESTATES = 'GameStates'
const LABEL_ROOM_ID = 'room_id:'
const LABEL_TOKEN = 'token:'
const LABEL_MESSAGE = 'message:'
const CHECK_GAME_STATES = 'Check gamesStates'
const CHECK_GAME_STATE_BY_ROOM_ID = 'Check gameState by room_id'
const DELETE_ALL_GAME_STATES = 'Delete all gameStates'
const DELETE_GAME_STATE_BY_ROOM_ID = 'Delete gameState by room_id'
const RE_INIT_ALL_GAME_STATES = 'Re init all gamestates'
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
  const [message, setMessage] = useState({"type": "REDIRECT", "path": "/lobby"})

  const checkGameStates = async () => {
    const res = await fetch(`${API_SERVER_HOST}/god/check-game-states`)
    const json = await res.json()
    setResponse(json)
  }

  const checkGameStateByRoomId = async () => {
    const res = await fetch(
      `${API_SERVER_HOST}/god/check-game-state-by-room-id?room_id=${roomId}`
    )
    const json = await res.json()
    setResponse(json)
  }

  const deleteAllGameStates = async () => {
    const res = await fetch(`${API_SERVER_HOST}/god/delete-all-game-states`)
    const json = await res.json()
    setResponse(json)
  }

  const deleteGameStateByRoomId = async () => {
    const res = await fetch(
      `${API_SERVER_HOST}/god/delete-game-state-by-room-id?room_id=${roomId}`
    )
    const json = await res.json()
    setResponse(json)
  }

  const reInitAllGameStates = async () => {
    const res = await fetch(
      `${API_SERVER_HOST}/god/re-init-all-game-states`
    )
    const json = await res.json()
    setResponse(json)
  }

  const checkConnections = async () => {
    const res = await fetch(`${API_SERVER_HOST}/god/check-connections`)
    const json = await res.json()
    setResponse(json)
  }

  const removePlayerByToken = async () => {
    const res = await fetch(`${API_SERVER_HOST}/god/delete-player-by-token?token=${token}`)
    const json = await res.json()
    setResponse(json)
  }

  const removeAllPlayers = async () => {
    const res = await fetch(`${API_SERVER_HOST}/god/delete-all-players`)
    const json = await res.json()
    setResponse(json)
  }

  // {"type": "MESSAGE", "message": "hi there, this is a broadcast message"}
  // examples:
  // {"type": "REDIRECT", "path": "/stub"}
  const broadcastToAll = useCallback(async () => {
    const res = await fetch(`${API_SERVER_HOST}/god/broadcast-to-all`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message: message}),
    })
    const json = await res.json()
    setResponse(json)
  }, [message, setResponse])

  const broadcastToAllInRoom = useCallback(async () => {
    const res = await fetch(`${API_SERVER_HOST}/god/broadcast-to-all-in-room`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message: message, room_id: roomId}),
    })
    const json = await res.json()
    setResponse(json)
  }, [token, message, setResponse])

  const sendMessageToPlayer = useCallback(async () => {
    const res = await fetch(`${API_SERVER_HOST}/god/send-message-to-player`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message: message, token: token}),
    })
    const json = await res.json()
    setResponse(json)
  }, [token, message, setResponse])

  const listOnugEnvVars = async () => {
    const res = await fetch('/god/list-onug-env-vars')
    const json = await res.json()
    setResponse(json)
  }

  const deleteAllOldLogFiles = async () => {
    const res = await fetch('/god/delete-all-old-log-files')
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
        <GameStatesContainer>
          <GodTitle>
            <Icon iconName="shield" size={25} /> {GAMESTATES}
          </GodTitle>
          <FormContainer>
            <InputContainer>
              <Label htmlFor="room_id">
                <Icon iconName="artifact" size={25} /> {LABEL_ROOM_ID}
              </Label>
              <Input
                type="text"
                id="room_id"
                name="room_id"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="token">
                <Icon iconName="mason" size={25} /> {LABEL_TOKEN}
              </Label>
              <Input
                type="text"
                id="token"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </InputContainer>
          </FormContainer>
          <ButtonsContainer>
            <Button onClick={checkGameStates}>
              <Icon iconName="alien" size={25} /> {CHECK_GAME_STATES}
            </Button>
            <Button onClick={checkGameStateByRoomId}>
              <Icon iconName="assassin" size={25} />{' '}
              {CHECK_GAME_STATE_BY_ROOM_ID}
            </Button>
            <Button onClick={deleteAllGameStates}>
              <Icon iconName="mortician" size={25} /> {DELETE_ALL_GAME_STATES}
            </Button>
            <Button onClick={deleteGameStateByRoomId}>
              <Icon iconName="dreamwolf" size={25} />{' '}
              {DELETE_GAME_STATE_BY_ROOM_ID}
            </Button>
            <Button onClick={reInitAllGameStates}>
              <Icon iconName="dreamwolf" size={25} />{' '}
              {RE_INIT_ALL_GAME_STATES}
            </Button>
          </ButtonsContainer>
        </GameStatesContainer>

        <WSContainer>
          <GodTitle>
            <Icon iconName="family" size={25} /> {WS}
          </GodTitle>
          <FormContainer>
            <InputContainer>
              <Label htmlFor="message">
                <Icon iconName="mason" size={25} /> {LABEL_MESSAGE}
              </Label>
              <textarea
                id="message"
                name="message"
                defaultValue={JSON.stringify(message)}
                onChange={(event) => setMessageHandler(event.target.value)}
              />
            </InputContainer>
          </FormContainer>
          <ButtonsContainer>
            <Button onClick={checkConnections}>
              <Icon iconName="seer" size={25} /> {CHECK_CONNECTIONS}
            </Button>
            <Button onClick={removeAllPlayers}>
              <Icon iconName="blob" size={25} /> {REMOVE_ALL_PLAYERS}
            </Button>
            <Button onClick={removePlayerByToken}>
              <Icon iconName="villain" size={25} />{' '}
              {REMOVE_PLAYER_BY_TOKEN}
            </Button>
            <Button onClick={broadcastToAll}>
              <Icon iconName="vampire" size={25} /> {BROADCAST_TO_ALL}
            </Button>
            <Button onClick={broadcastToAllInRoom}>
              <Icon iconName="fang" size={25} /> {BROADCAST_TO_ALL_IN_ROOM}
            </Button>
            <Button onClick={sendMessageToPlayer}>
              <Icon iconName="lover" size={25} /> {SEND_MESSAGE_TO_PLAYER}
            </Button>
          </ButtonsContainer>
        </WSContainer>

        <MetaContainer>
          <GodTitle>
            <Icon iconName="tanner" size={25} /> {META}
          </GodTitle>
          <ButtonsContainer>
            <Button onClick={listOnugEnvVars}>
              <Icon iconName="werewolf" size={25} /> {LIST_ONUG_ENV_VARS}
            </Button>
            <Button onClick={deleteAllOldLogFiles}>
              <Icon iconName="cow" size={25} /> {DELETE_ALL_OLD_LOG_FILES}
            </Button>
          </ButtonsContainer>
        </MetaContainer>
      </LeftSide>

      <RightSide>
        <GodTitle>
          <Icon iconName="interaction" size={25} /> {RESPONSE}{' '}
          <Icon iconName="blind" size={25} />
          <Icon iconName="claw" size={25} />
          <Icon iconName="eye" size={25} />
          <Icon iconName="mute" size={25} />
          <Icon iconName="ufo" size={25} />
          <Icon iconName="select" size={25} />
          <Icon iconName="secret" size={25} />
        </GodTitle>
        <ResponseContainer>
          <ResponsePre>{`${JSON.stringify(response, null, 4)}`}</ResponsePre>
        </ResponseContainer>
      </RightSide>
    </StyledGod>
  )
})
