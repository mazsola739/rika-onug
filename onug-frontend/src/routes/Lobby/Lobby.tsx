import { observer } from 'mobx-react-lite'
import { StyledLobby } from './Lobby.styles'
import { LobbyButton } from './LobbyButton'
import { useLobby } from './useLobby'

export const Lobby: React.FC = observer(() => {
  const { lobbyStore, handleJoinRoom } = useLobby()

  return lobbyStore.isLoading ? (
    <div>Loading...</div>
  ) : lobbyStore.errorMessage ? (
    <div>{lobbyStore.errorMessage}</div>
  ) : (
    <StyledLobby>
      {lobbyStore.rooms.map((room, index) => (
        <LobbyButton key={index} onClick={() => handleJoinRoom(room.room_id)} buttonText={room.room_name} img={room.room_id} />
      ))}
    </StyledLobby>
  )
})
