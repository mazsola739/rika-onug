import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Slaves, StyledLobby, LowPhas, StyledRoomButton } from './Lobby.styles'
import { lobbyStore } from 'store'
import { useNavigate } from 'react-router-dom'
import { StyledLobbyProps } from './Lobby.types'
import { Link } from 'react-router-dom'

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

  const handleJoinRoom = async (roomId: string) => {
    try {
      const requestBody = {
        route: 'join-room',
        room_id: roomId,
      }

      const response = await fetch('http://localhost:7654/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const responseData = await response.json()

      if (responseData.success) {
        navigate(`/room/${roomId}`)
      }
    } catch (error) {
      console.error('Error joining room:', error)
    }
  }

  if (lobbyStore.isLoading) {
    return <div>Loading...</div>
  }

  if (lobbyStore.errorMessage) {
    return <div>{lobbyStore.errorMessage}</div>
  }
  //TODO title
  return (
    <StyledLobby>
      {/*       <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Castle of Mad King Ludwig
      </h1> */}
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
