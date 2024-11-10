import { HYDRATE_LOBBY, JOIN_ROOM, REDIRECT } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lobbyStore, wsStore } from 'store'

export const useLobby = () => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const { lastJsonMessage, sendJsonMessage } = wsStore.getWsCommunicationsBridge()

  //TODO Do i need??
  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: HYDRATE_LOBBY,
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_LOBBY) {
      console.log(HYDRATE_LOBBY)
    }

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
