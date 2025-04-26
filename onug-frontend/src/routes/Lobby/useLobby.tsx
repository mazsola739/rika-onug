import { useState, useEffect } from 'react'
import { useClickHandler } from 'hooks'
import { lobbyStore, wsStore } from 'store'
import { adjectives, JOIN_ROOM, nouns, REDIRECT } from 'constant'
import { useNavigate } from 'react-router-dom'

export const useLobby = () => {
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
  const { handleSelectRoom, handleJoinRoom } = useClickHandler()

  const generateFunnyNickname = () => {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
    return `${randomAdjective}${randomNoun}`
  }

  const [selectedRoom, setSelectedRoom] = useState('')
  const [nickname, setNickname] = useState(() => localStorage.getItem('nickname') || generateFunnyNickname())
  const [roomInfo, setRoomInfo] = useState<string | null>(null)

  useEffect(() => {
    if (lastJsonMessage) {
      if (!lastJsonMessage.success) {
        setRoomInfo('This room is closed, the game has started, or the room is full.')
      } else if (lastJsonMessage.total_players === 0) {
        setRoomInfo('This room has no players.')
      } else if (Array.isArray(lastJsonMessage.player_names)) {
        setRoomInfo(`Players in this room: ${lastJsonMessage.player_names.join(', ')}`)
      } else {
        setRoomInfo('Player information is unavailable.')
      }
    }
  }, [lastJsonMessage])

  const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoomId = event.target.value
    setSelectedRoom(selectedRoomId)

    if (selectedRoomId) {
      handleSelectRoom(selectedRoomId, nickname)
    }
  }

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= 20) {
      setNickname(value)
    }
  }

  const regenerateNickname = () => {
    setNickname(generateFunnyNickname())
  }

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    localStorage.setItem('nickname', nickname)
    handleJoinRoom(selectedRoom, nickname)
  }

  useEffect(() => {
    lobbyStore.fetchRooms().then(() => {
      /* do nothing */
    })
  }, [])

  return {
    selectedRoom,
    nickname,
    roomInfo,
    handleRoomChange,
    handleNicknameChange,
    regenerateNickname,
    handleLogin,
    setRoomInfo,
  }
}
