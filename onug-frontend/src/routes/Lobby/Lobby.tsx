import { observer } from 'mobx-react-lite'
import { StyledLobby, FormContainer, Label, Input, Select, ButtonB, Selection, RoomBackground } from './Lobby.styles'
import { useLobby } from './useLobby'
import { Button, ButtonGroup } from 'components'
import { lobbyStore } from 'store'
import { presetCards } from 'constant'

export const Lobby: React.ComponentType = observer(() => {
  const { rooms } = lobbyStore
  const { selectedRoom, nickname, roomInfo, handleRoomChange, handleNicknameChange, regenerateNickname, handleLogin } = useLobby()

  return lobbyStore.isLoading ? (
    <div>Loading...</div>
  ) : lobbyStore.errorMessage ? (
    <div>{lobbyStore.errorMessage}</div>
  ) : (
    <StyledLobby>
      <Selection>
        <FormContainer onSubmit={handleLogin}>
          <Label>
            Nickname:
            <Input
              type="text"
              name="nickname"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={handleNicknameChange}
              required
              maxLength={20}
              pattern="[a-zA-Z0-9]*"
              title="Nickname can only contain letters and numbers, and must be 20 characters or fewer."
            />
            <ButtonB type="button" onClick={regenerateNickname}>
              New Nickname
            </ButtonB>
          </Label>
          <Label>
            Room:
            <Select name="room" onChange={handleRoomChange} required defaultValue="">
              <option value="" disabled>
                Select a room
              </option>
              {rooms.map(room => (
                <option key={room.room_id} value={room.room_id} style={{ color: '#333' }}>
                  {room.room_name}
                </option>
              ))}
            </Select>
          </Label>
          <ButtonB type="submit">Join</ButtonB>
        </FormContainer>

        <RoomBackground img={selectedRoom ? `/assets/rooms/${selectedRoom}.webp` : ''}>
          {selectedRoom ? null : <p>No room selected</p>}
        </RoomBackground>

        {/* Display room information */}
        {roomInfo && <p style={{ color: 'blue' }}>{roomInfo}</p>}
      </Selection>
      <h2>Preset Cards</h2>
      <ButtonGroup>
        {presetCards.map(preset => (
          <Button key={preset.value} onClick={() => console.log(`Preset selected: ${preset.value}`)} buttonText={preset.label} variant="primary" />
        ))}
      </ButtonGroup>
    </StyledLobby>
  )
})
