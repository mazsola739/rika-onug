import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { StyledLobby, StyledRoomButton } from './Lobby.styles'
import { lobbyStore, wsStore } from 'store'
import { StyledLobbyProps } from './Lobby.types'
import { HYDRATE_LOBBY, JOIN_ROOM, REDIRECT, STAGES } from 'constant'
import { useNavigate } from 'react-router-dom'

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
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const token = sessionStorage.getItem('token')

  const { lastJsonMessage, sendJsonMessage } =
    wsStore.getWsCommunicationsBridge()

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: HYDRATE_LOBBY,
        stage: STAGES.LOBBY,
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_LOBBY) {
      console.log(lastJsonMessage)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }

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
  }, [sendJsonMessage, lastJsonMessage])

  useEffect(() => {
    lobbyStore.fetchRooms().then(() => {
      /* do nothing */
    })
  }, [])

  const handleJoinRoom = (room_id: string) => {
    sendJsonMessage?.({
      type: JOIN_ROOM,
      room_id,
      token,
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
          key={index}
          onClick={() => handleJoinRoom(room.room_id)}
          index={index}
          buttonText={room.room_name}
        />
      ))}
    </StyledLobby>
  )
})
