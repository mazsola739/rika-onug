import { JOIN_ROOM, REDIRECT } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lobbyStore, wsStore } from 'store'

export const useLobbyy = () => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const { lastJsonMessage, sendJsonMessage } = wsStore.getWsCommunicationsBridge()

  useEffect(() => {
    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }

    if (lastJsonMessage?.type === JOIN_ROOM) {
      if (lastJsonMessage.success) {
        const { room_id, player } = lastJsonMessage
        sessionStorage.setItem('room_id', room_id)
        sessionStorage.setItem('player_name', player.player_name)
        navigate(`/room/${room_id}`)
      } else {
        console.error(lastJsonMessage.errors)
      }
    }
  }, [lastJsonMessage, navigate])

  useEffect(() => {
    lobbyStore.fetchRooms().then(() => {
      /* do nothing */
    })
  }, [])

  return {
    lobbyStore
  }
}
