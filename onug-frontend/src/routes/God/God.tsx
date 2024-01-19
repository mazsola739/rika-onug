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
const RESPONSE = 'Response'

// TODO security, protected routing and sending a secure GOD token

export const God: React.FC = observer(() => {
  const [response, setResponse] = useState({
    serverResponse: 'will be populated here',
  })

  const checkGameStates = async () => {
    const res = await fetch('/god/check-game-states')
    const json = await res.json()
    setResponse(json)
  }

  const checkGameStateByRoomId = () => {
    console.log('Click')
  }

  const deleteAllGameStates = async () => {
    const res = await fetch('/god/delete-all-game-states')
    const json = await res.json()
    setResponse(json)
  }

  const deleteAllGameStateByRoomId = () => {
    console.log('Click')
  }

  const checkConnections = async () => {
    const res = await fetch('/god/check-connections')
    const json = await res.json()
    setResponse(json)
  }

  const removePlayerByToken = () => {
    console.log('Click')
  }

  const removeAllPlayers = () => {
    console.log('Click')
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

  const listOnugEnvVars = () => {
    console.log('Click')
  }

  return (
    <StyledGod>
      <LeftSide>
        <GameStatesContainer>
          <GodTitle>{GAMESTATES}</GodTitle>
          <FormContainer>
            <InputContainer>
              <Label htmlFor="room_id">{LABEL_ROOM_ID}</Label>
              <Input type="text" id="room_id" name="room_id" />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="token">{LABEL_TOKEN}</Label>
              <Input type="text" id="token" name="token" />
            </InputContainer>
          </FormContainer>
          <ButtonsContainer>
            <Button onClick={checkGameStates}>{CHECK_GAME_STATES}</Button>
            <Button onClick={checkGameStateByRoomId}>
              {CHECK_GAME_STATE_BY_ROOM_ID}
            </Button>
            <Button onClick={deleteAllGameStates}>
              {DELETE_ALL_GAME_STATES}
            </Button>
            <Button onClick={deleteAllGameStateByRoomId}>
              {DELETE_GAME_STATE_BY_ROOM_ID}
            </Button>
          </ButtonsContainer>
        </GameStatesContainer>

        <WSContainer>
          <GodTitle>{WS}</GodTitle>
          <ButtonsContainer>
            <Button onClick={checkConnections}>{CHECK_CONNECTIONS}</Button>
            <Button onClick={removePlayerByToken}>
              {REMOVE_PLAYER_BY_TOKEN}
            </Button>
            <Button onClick={removeAllPlayers}>{REMOVE_ALL_PLAYERS}</Button>
            <Button onClick={broadcastToAll}>{BROADCAST_TO_ALL}</Button>
            <Button onClick={broadcastToAllInRoom}>
              {BROADCAST_TO_ALL_IN_ROOM}
            </Button>
            <Button onClick={sendMessageToPlayer}>
              {SEND_MESSAGE_TO_PLAYER}
            </Button>
          </ButtonsContainer>
        </WSContainer>

        <MetaContainer>
          <GodTitle>{META}</GodTitle>
          <ButtonsContainer>
            <Button onClick={listOnugEnvVars}>{LIST_ONUG_ENV_VARS}</Button>
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
