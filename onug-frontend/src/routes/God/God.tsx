import { observer } from 'mobx-react-lite'
import { useState } from 'react'
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

const GAMESTATES = 'GameStates'
const LABEL_ROOM_ID = 'room_id:'
const LABEL_TOKEN = 'token:'
const CHECK_GAME_STATES = 'Check gamesStates'
const CHECK_GAME_STATE_BY_ROOM_ID = 'Check gameState by room_id'
const DELETE_ALL_GAME_STATES = 'Delete all gameStates'
const DELETE_GAME_STATE_BY_ROOM_ID = 'Delete gameState by room_id'
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

  const checkGameStates = async () => {
    const res = await fetch('/god/check-game-states')
    const json = await res.json()
    setResponse(json)
  }

  const checkGameStateByRoomId = async () => {
    const res = await fetch(
      `/god/check-game-state-by-room-id?room_id=${roomId}`
    )
    const json = await res.json()
    setResponse(json)
  }

  const deleteAllGameStates = async () => {
    const res = await fetch('/god/delete-all-game-states')
    const json = await res.json()
    setResponse(json)
  }

  const deleteGameStateByRoomId = async () => {
    const res = await fetch(
      `/god/delete-game-state-by-room-id?room_id=${roomId}`
    )
    const json = await res.json()
    setResponse(json)
  }

  const checkConnections = async () => {
    const res = await fetch('/god/check-connections')
    const json = await res.json()
    setResponse(json)
  }

  const removePlayerByToken = async () => {
    const res = await fetch(`/god/delete-player-by-token?token=${token}`)
    const json = await res.json()
    setResponse(json)
  }

  const removeAllPlayers = async () => {
    const res = await fetch('/god/delete-all-players')
    const json = await res.json()
    setResponse(json)
  }

  const broadcastToAll = () => {
    console.log('Click')
  }

  const broadcastToAllInRoom = () => {
    console.log('Click')
  }

  const sendMessageToPlayer = () => {
    console.log('Click')
  }

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

  return (
    <StyledGod>
      <LeftSide>
        <GameStatesContainer>
          <GodTitle>
            <img
              src={'/assets/icons/shield.svg'}
              alt="icon"
              style={{ height: '25px' }}
            />{' '}
            {GAMESTATES}{' '}
            <img
              src={'/assets/icons/shield.svg'}
              alt="icon"
              style={{ height: '25px' }}
            />
          </GodTitle>
          <FormContainer>
            <InputContainer>
              <Label htmlFor="room_id">
                <img
                  src={'/assets/icons/artifact.svg'}
                  alt="icon"
                  style={{ height: '25px' }}
                />{' '}
                {LABEL_ROOM_ID}{' '}
                <img
                  src={'/assets/icons/artifact.svg'}
                  alt="icon"
                  style={{ height: '25px' }}
                />
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
                <img
                  src={'/assets/icons/mason.svg'}
                  alt="icon"
                  style={{ height: '25px' }}
                />{' '}
                {LABEL_TOKEN}{' '}
                <img
                  src={'/assets/icons/mason.svg'}
                  alt="icon"
                  style={{ height: '25px' }}
                />
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
              <img
                src={'/assets/icons/alien.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />{' '}
              {CHECK_GAME_STATES}{' '}
              <img
                src={'/assets/icons/alien.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />
            </Button>
            <Button onClick={checkGameStateByRoomId}>
              <img
                src={'/assets/icons/assassin.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />{' '}
              {CHECK_GAME_STATE_BY_ROOM_ID}{' '}
              <img
                src={'/assets/icons/assassin.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />
            </Button>
            <Button onClick={deleteAllGameStates}>
              <img
                src={'/assets/icons/mortician.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />{' '}
              {DELETE_ALL_GAME_STATES}{' '}
              <img
                src={'/assets/icons/mortician.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />
            </Button>
            <Button onClick={deleteGameStateByRoomId}>
              <img
                src={'/assets/icons/dreamwolf.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />{' '}
              {DELETE_GAME_STATE_BY_ROOM_ID}{' '}
              <img
                src={'/assets/icons/dreamwolf.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />
            </Button>
          </ButtonsContainer>
        </GameStatesContainer>

        <WSContainer>
          <GodTitle>
            <img
              src={'/assets/icons/family.svg'}
              alt="icon"
              style={{ height: '25px' }}
            />{' '}
            {WS}{' '}
            <img
              src={'/assets/icons/family.svg'}
              alt="icon"
              style={{ height: '25px' }}
            />
          </GodTitle>
          <ButtonsContainer>
            <Button onClick={checkConnections}>
              <img
                src={'/assets/icons/seer.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />{' '}
              {CHECK_CONNECTIONS}{' '}
              <img
                src={'/assets/icons/seer.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />
            </Button>
            <Button onClick={removeAllPlayers}>
              <img
                src={'/assets/icons/blob.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />{' '}
              {REMOVE_ALL_PLAYERS}{' '}
              <img
                src={'/assets/icons/blob.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />
            </Button>
            <Button onClick={removePlayerByToken}>
              <img
                src={'/assets/icons/supervillain.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />{' '}
              {REMOVE_PLAYER_BY_TOKEN}{' '}
              <img
                src={'/assets/icons/supervillain.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />
            </Button>
            <Button onClick={broadcastToAll}>
              <img
                src={'/assets/icons/vampire.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />{' '}
              {BROADCAST_TO_ALL}{' '}
              <img
                src={'/assets/icons/vampire.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />
            </Button>
            <Button onClick={broadcastToAllInRoom}>
              <img
                src={'/assets/icons/fang.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />{' '}
              {BROADCAST_TO_ALL_IN_ROOM}{' '}
              <img
                src={'/assets/icons/fang.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />
            </Button>
            <Button onClick={sendMessageToPlayer}>
              <img
                src={'/assets/icons/lover.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />{' '}
              {SEND_MESSAGE_TO_PLAYER}{' '}
              <img
                src={'/assets/icons/lover.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />
            </Button>
          </ButtonsContainer>
        </WSContainer>

        <MetaContainer>
          <GodTitle>
            <img
              src={'/assets/icons/tanner.svg'}
              alt="icon"
              style={{ height: '25px' }}
            />{' '}
            {META}{' '}
            <img
              src={'/assets/icons/tanner.svg'}
              alt="icon"
              style={{ height: '25px' }}
            />
          </GodTitle>
          <ButtonsContainer>
            <Button onClick={listOnugEnvVars}>
              <img
                src={'/assets/icons/werewolf.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />{' '}
              {LIST_ONUG_ENV_VARS}{' '}
              <img
                src={'/assets/icons/werewolf.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />
            </Button>
            <Button onClick={deleteAllOldLogFiles}>
              <img
                src={'/assets/icons/cow.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />{' '}
              {DELETE_ALL_OLD_LOG_FILES}{' '}
              <img
                src={'/assets/icons/cow.svg'}
                alt="icon"
                style={{ height: '25px' }}
              />
            </Button>
          </ButtonsContainer>
        </MetaContainer>
      </LeftSide>

      <RightSide>
        <GodTitle>
          <img
            src={'/assets/icons/interaction.svg'}
            alt="icon"
            style={{ height: '25px' }}
          />{' '}
          {RESPONSE}{' '}
          <img
            src={'/assets/icons/interaction.svg'}
            alt="icon"
            style={{ height: '25px' }}
          />
        </GodTitle>
        <ResponseContainer>
          <ResponsePre>{`${JSON.stringify(response, null, 4)}`}</ResponsePre>
        </ResponseContainer>
      </RightSide>
    </StyledGod>
  )
})
