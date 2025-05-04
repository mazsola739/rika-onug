import { useState, useEffect } from 'react'
import { useClickHandler } from 'hooks'
import { lobbyStore, wsStore } from 'store'
import { ADJECTIVES, JOIN_ROOM, NOUNS, PRESELECT, REDIRECT, SELECT_ROOM, STAGES } from 'constants'
import { useNavigate } from 'react-router-dom'
import { LobbyDataType, PresetType, RoomType } from 'types'

//TODO useclickhandler, usechnagehandler
//TODO handling all error message properly

const lobbyData = (rooms: RoomType[], presets: PresetType[]) => {
  const newRooms = rooms.map(room => ({
    option: room.room_name,
    value: room.room_id
  }))

  const newPresets = presets.map(preset => ({
    option: preset.description,
    value: preset.description
  }))

  return { newRooms, newPresets }
}

export const useLobby = () => {
  const token = sessionStorage.getItem('token')
  const [firstTime, setFirstTime] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const { lastJsonMessage, sendJsonMessage } = wsStore.getWsCommunicationsBridge()
  const [selectedRoom, setSelectedRoom] = useState('')
  const [nickname, setNickname] = useState(() => localStorage.getItem('nickname') || generateFunnyNickname())
  const [roomInfo, setRoomInfo] = useState<string | null>(null)
  const [stage, setStage] = useState<string>(STAGES.LOBBY)

  const { rooms, presets } = lobbyStore

  const { newRooms, newPresets } = lobbyData(rooms, presets)

  useEffect(() => {
    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
    if (lastJsonMessage?.type === JOIN_ROOM) {
      if (lastJsonMessage.success) {
        const { room_id, player } = lastJsonMessage
        sessionStorage.setItem('room_id', room_id)
        sessionStorage.setItem('player_name', player.player_name)
        //todo last selected room?
        navigate(`/room/${room_id}`)
      } else {
        console.error(lastJsonMessage.errors)
      }
    }

    if (lastJsonMessage) {
      if (lastJsonMessage?.type === SELECT_ROOM && !lastJsonMessage.success) {
        setRoomInfo(lastJsonMessage.errors?.[0] || 'No room selected.')
        setStage(lastJsonMessage.stage)
      } else if (lastJsonMessage.total_players === 0) {
        setRoomInfo('This room has no players.')
        setStage(lastJsonMessage.stage)
      } else if (Array.isArray(lastJsonMessage.player_names)) {
        setRoomInfo(`Players in this room: ${lastJsonMessage.player_names.join(', ')}`)
        setStage(lastJsonMessage.stage)
      } else {
        setRoomInfo('Player information is unavailable.')
        setStage(lastJsonMessage.stage)
      }
    }

  }, [lastJsonMessage, navigate])
  const { handleJoinRoom } = useClickHandler()

  const handleSelectRoom = (selected_room_id: string, nickname: string) => {
    sendJsonMessage?.({
      type: SELECT_ROOM,
      room_id: selected_room_id,
      nickname,
      token
    })
  }

  const generateFunnyNickname = () => {
    const randomAdjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
    const randomNoun = NOUNS[Math.floor(Math.random() * NOUNS.length)]
    return `${randomAdjective}${randomNoun}`
  }

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

  const handleLogin = () => {
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
    const preset = presets.find(p => p.description === selectedPresetDescription)

    if (preset) {
      sendJsonMessage({
        type: PRESELECT,
        token,
        room_id: selectedRoom,
        selected_cards: preset.cards,
      })
    }
  }

  return {
    selectedRoom,
    nickname,
    roomInfo,
    stage,
    errorMessage,
    handleRoomChange,
    handleNicknameChange,
    regenerateNickname,
    handleLogin,
    setRoomInfo,
    handlePreset,
    handleSelectRoom,
    newRooms,
    newPresets
  }
}
