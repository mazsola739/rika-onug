import { useState, useEffect } from 'react'
import { useClickHandler } from 'hooks'
import { lobbyStore, wsStore } from 'store'
import { adjectives, JOIN_ROOM, nouns, PRESELECT, REDIRECT } from 'constant'
import { useNavigate } from 'react-router-dom'

export const useLobby = () => {
  const token = sessionStorage.getItem('token')
  const [firstTime, setFirstTime] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const { lastJsonMessage, sendJsonMessage } = wsStore.getWsCommunicationsBridge()

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message || 'An unexpected error occurred.')
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
    try {
      if (lastJsonMessage) {
        if (!lastJsonMessage.success) {
          setRoomInfo(lastJsonMessage.errors[0])
        } else if (lastJsonMessage.total_players === 0) {
          setRoomInfo('This room has no players.')
        } else if (Array.isArray(lastJsonMessage.player_names)) {
          setRoomInfo(`Players in this room: ${lastJsonMessage.player_names.join(', ')}`)
        } else {
          setRoomInfo('Player information is unavailable.')
        }
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message || 'An unexpected error occurred.')
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
    lobbyStore.fetchLobby().then(() => {
      /* do nothing */
    })
  }, [])

  const handlePreset = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPresetDescription = event.target.value
    const preset = lobbyStore.presets.find(p => p.description === selectedPresetDescription)

    if (preset) {
      sendJsonMessage({
        type: PRESELECT,
        token,
        selected_cards: preset.cards,
      })
    }
  }

  return {
    selectedRoom,
    nickname,
    roomInfo,
    errorMessage,
    handleRoomChange,
    handleNicknameChange,
    regenerateNickname,
    handleLogin,
    setRoomInfo,
    handlePreset
  }
}
