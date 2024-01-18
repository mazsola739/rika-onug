import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Slaves, StyledLobby, LowPhas, StyledRoomButton } from './Lobby.styles'
import { lobbyStore, wsStore } from 'store'
import { useNavigate } from 'react-router-dom'
import { StyledLobbyProps } from './Lobby.types'
import { HYDRATE_LOBBY, JOIN_ROOM, STAGES } from 'constant'

const RoomButton: React.FC<StyledLobbyProps> = ({
  buttonText,
  onClick,
  index,
}) => {
  const testId = buttonText.replace(/ /g, '-')

  return (
    <StyledRoomButton index={index} onClick={onClick} data-testid={testId}>
      {buttonText}
    </StyledRoomButton>
  )
}

export const Lobby: React.FC = observer(() => {
  const navigate = useNavigate()
  const { lastJsonMessage, sendJsonMessage } =
    wsStore.getWsCommunicationsBridge()
  const [firstTime, setFirstTime] = useState(true)

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage({
        type: HYDRATE_LOBBY,
        stage: STAGES.LOBBY,
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_LOBBY) {
      console.log(lastJsonMessage) //TODO hook
    }
  }, [sendJsonMessage, lastJsonMessage])

  useEffect(() => {
    if (lastJsonMessage?.type === JOIN_ROOM) {
      if (lastJsonMessage.success) {
        const { room_id, player_name } = lastJsonMessage
        sessionStorage.setItem('room_id', room_id)
        sessionStorage.setItem('player_name', player_name)

        navigate(`/room/${room_id}`)
      } else {
        console.error(lastJsonMessage.errors)
      }
    }
  }, [lastJsonMessage])

  useEffect(() => {
    lobbyStore.fetchRooms()
  }, [])

  const handleJoinRoom = (room_id: string) => {
    const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()
    sendJsonMessage({
      type: JOIN_ROOM,
      room_id,
      token: sessionStorage.getItem('token'),
    })
  }

  return lobbyStore.isLoading ? (
    <div>Loading...</div>
  ) : lobbyStore.errorMessage ? (
    <div>{lobbyStore.errorMessage}</div>
  ) : (
    <StyledLobby>
      {lobbyStore.rooms.map((room, index) => (
        <RoomButton
          key={room.room_id}
          onClick={() => handleJoinRoom(room.room_id)}
          index={index}
          buttonText={room.room_name}
        />
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
