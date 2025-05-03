import { observer } from 'mobx-react-lite'
import { useGod } from './useGod'
import { StyledGod, LeftSide, RightSide, GodTitle, FormContainer, InputContainer, Label, Input, ButtonsContainer, Button, ResponseContainer, ResponsePre } from './God.styles'

export const God: React.ComponentType = observer(() => {
  const { response, roomId, token, message, setRoomId, setToken, setMessageHandler, checkGamestates, checkGamestateByRoomId, deleteAllGamestates, deleteGamestateByRoomId, reInitAllGamestates, checkConnections, removePlayerByToken, removeAllPlayers, broadcastToAll, broadcastToAllInRoom, sendMessageToPlayer, listOnugEnvVars, deleteAllOldLogFiles, readNohupFE, readNohupBE } = useGod()

  return (
    <StyledGod>
      <LeftSide>
        {/* Gamestates Section */}
        <GodTitle>Game States</GodTitle>
        <FormContainer>
          <InputContainer>
            <Label htmlFor='room_id'>Room ID:</Label>
            <Input type='text' id='room_id' value={roomId} onChange={e => setRoomId(e.target.value)} />
          </InputContainer>
          <InputContainer>
            <Label htmlFor='token'>Token:</Label>
            <Input type='text' id='token' value={token} onChange={e => setToken(e.target.value)} />
          </InputContainer>
        </FormContainer>
        <ButtonsContainer>
          <Button onClick={checkGamestates}>Check Gamestates</Button>
          <Button onClick={checkGamestateByRoomId}>Check Gamestate by Room ID</Button>
          <Button onClick={deleteAllGamestates}>Delete All Gamestates</Button>
          <Button onClick={deleteGamestateByRoomId}>Delete Gamestate by Room ID</Button>
          <Button onClick={reInitAllGamestates}>Re-init All Gamestates</Button>
        </ButtonsContainer>

        {/* WebSocket Section */}
        <GodTitle>WebSocket</GodTitle>
        <FormContainer>
          <InputContainer>
            <Label htmlFor='message'>Message:</Label>
            <textarea id='message' value={JSON.stringify(message)} onChange={e => setMessageHandler(e.target.value)} style={{ color: '#333', lineHeight: '2', borderRadius: '5px' }} />
          </InputContainer>
        </FormContainer>
        <ButtonsContainer>
          <Button onClick={checkConnections}>Check Connections</Button>
          <Button onClick={removeAllPlayers}>Remove All Players</Button>
          <Button onClick={removePlayerByToken}>Remove Player by Token</Button>
          <Button onClick={broadcastToAll}>Broadcast to All</Button>
          <Button onClick={broadcastToAllInRoom}>Broadcast to Room</Button>
          <Button onClick={sendMessageToPlayer}>Send Message to Player</Button>
        </ButtonsContainer>

        {/* Nohup Section */}
        <GodTitle>Nohup</GodTitle>
        <ButtonsContainer>
          <Button onClick={readNohupFE}>Nohup FE</Button>
          <Button onClick={readNohupBE}>Nohup BE</Button>
        </ButtonsContainer>

        {/* Meta Section */}
        <GodTitle>Meta</GodTitle>
        <ButtonsContainer>
          <Button onClick={listOnugEnvVars}>List Env Vars</Button>
          <Button onClick={deleteAllOldLogFiles}>Delete Old Log Files</Button>
        </ButtonsContainer>
      </LeftSide>

      {/* Response Section */}
      <RightSide>
        <GodTitle>Response</GodTitle>
        <ResponseContainer>
          <ResponsePre>{JSON.stringify(response, null, 4)}</ResponsePre>
        </ResponseContainer>
      </RightSide>
    </StyledGod>
  )
})
