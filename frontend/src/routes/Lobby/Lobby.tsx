import { observer } from 'mobx-react-lite'
import { StyledLobby, FormContainer, Selection, RoomBackground, Nickname, InfoContainer } from './Lobby.styles'
import { useLobby } from './useLobby'
import { Button, ButtonGroup, DropdownMenu, InputField } from 'components'
import { lobbyStore } from 'store'
import { button_label_join, button_label_renick_me } from 'constants'

//TODO better styled components, better design

export const Lobby: React.ComponentType = observer(() => {

  const { nickname, roomInfo, stage, handleLogin, regenerateNickname, newPresets, newRooms ,handleRoomChange, handlePreset, handleNicknameChange, selectedRoom } = useLobby()

  return lobbyStore.isLoading ? (
    <div>Loading...</div>
  ) : lobbyStore.errorMessage ? (
    <div>{lobbyStore.errorMessage}</div>
  ) : (
    <StyledLobby>
      <h1>Welcome {nickname}</h1>
      <Selection>
        <FormContainer>
          <Nickname>
            <InputField label='Nickname:' type='text' name='nickname' placeholder='Enter your nickname' value={nickname} onChange={handleNicknameChange} required={true} maxLength={20} pattern='[a-zA-Z0-9]*' title='Nickname can only contain letters and numbers, and must be 20 characters or fewer.' />
            <Button onClick={regenerateNickname} buttonText={button_label_renick_me} variant='blue' />
          </Nickname>
          <DropdownMenu label='Room:' name='room' onChange={handleRoomChange} required={true} defaultValue='' options={newRooms} placeholder='Select a Room' />
          {/* TODO visible only when room not exist yet */}
          <DropdownMenu label='Preselected cards:' name='preset' onChange={handlePreset} required={true} defaultValue='' options={newPresets} placeholder='Preselect Cards' />
        </FormContainer>
        <RoomBackground img={selectedRoom ? `/assets/rooms/${selectedRoom}.webp` : '/assets/rooms/room_back.webp'} />
        <InfoContainer>
          {roomInfo && <p>{roomInfo}</p>}
          {stage && <p>Game stage: {stage}</p>}
          {/* Todo: visualize preselected cards? */}
          <ButtonGroup>
            <Button onClick={handleLogin} buttonText={button_label_join} variant='magenta' />
          </ButtonGroup>
        </InfoContainer>
      </Selection>
    </StyledLobby>
  )
})
