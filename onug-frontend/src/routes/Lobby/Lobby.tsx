import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Slaves, StyledLobby, LowPhas, StyledRoomButton } from './Lobby.styles'
import { lobbyStore } from 'store'
import { useNavigate } from 'react-router-dom'
import { StyledLobbyProps } from './Lobby.types'
import { Link } from 'react-router-dom'
import { joinRoomRequest } from 'api'

const RoomButton: React.FC<StyledLobbyProps> = ({
  buttonText,
  onClick,
  index,
}) => {
  return (
    <StyledRoomButton index={index} onClick={onClick}>
      {buttonText}
    </StyledRoomButton>
  )
}

export const Lobby: React.FC = observer(() => {
  const navigate = useNavigate()

  useEffect(() => {
    lobbyStore.fetchRooms()
  }, [])

  const handleJoinRoom = async (room_id: string) => {
    try {
      const responseData = await joinRoomRequest(room_id)
      console.log(responseData)

      if (responseData.success) {
        sessionStorage.setItem('token', responseData.token)
        sessionStorage.setItem('player_name', responseData.player_name)
        sessionStorage.setItem('room_id', responseData.room_id)

        navigate(`/room/${room_id}`)
      } else {
        console.error(`Failed to join room ${room_id}: ${responseData.error}`)
      }
    } catch (error) {
      console.error(`Error joining room ${room_id}: ${error.message}`)
    }
  }

  return lobbyStore.isLoading ? (
    <div>Loading...</div>
  ) : lobbyStore.errorMessage ? (
    <div>{lobbyStore.errorMessage}</div>
  ) : (
    <StyledLobby>
      {lobbyStore.rooms.map((room, index) => (
        <Link to={`/room/${room.room_id}`} key={room.room_id}>
          <RoomButton
            onClick={() => handleJoinRoom(room.room_id)}
            index={index}
            buttonText={room.room_name}
          />
        </Link>
      ))}
      <Slaves>
        <LowPhas color="white" style={{ transform: 'translate(125%, -100%)' }}>
          Jeeves
        </LowPhas>

        <LowPhas
          color="#A6A39D"
          style={{
            transform: 'translate(-75%, 50%)',
          }}
        >
          Alice
        </LowPhas>

        <LowPhas
          color="#6F777E"
          style={{
            transform: 'translate(-35%, 45%)',
          }}
        >
          Alfred
        </LowPhas>
      </Slaves>
    </StyledLobby>
  )
})
