import { observer } from 'mobx-react-lite'
import { StyledLobby, FormContainer, Label, Input, Select, Selection, RoomBackground } from './Lobby.styles'
import { useLobby } from './useLobby'
import { Button } from 'components'
import { lobbyStore } from 'store'

export const Lobby: React.ComponentType = observer(() => {
  const { rooms, presets } = lobbyStore
  const { selectedRoom, nickname, roomInfo, stage, handleRoomChange, handleNicknameChange, regenerateNickname, handleLogin, handlePreset } = useLobby()

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              <Button onClick={regenerateNickname} buttonText='New Nickname' variant="blue" />
            </div>
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
          <Label>
            Preselected cards:
            <Select name="preset" onChange={handlePreset} defaultValue="">
              <option value="" disabled>
                Select cards
              </option>
              {presets.map(preset => (
                <option key={preset.description} value={preset.description} style={{ color: '#333' }}>
                  {preset.description}
                </option>
              ))}
            </Select>
          </Label>
          <Button onClick={() => handleLogin} buttonText='Join' variant="magenta" />
        </FormContainer>

        <RoomBackground img={selectedRoom ? `/assets/rooms/${selectedRoom}.webp` : '/assets/rooms/room_back.webp'} />
        {roomInfo && <p>{roomInfo}</p>}
        {stage && <p>Game stage: {stage}</p>}
      </Selection>
    </StyledLobby>
  )
})
