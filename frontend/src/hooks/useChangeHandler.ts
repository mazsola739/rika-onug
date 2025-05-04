import { PRESELECT, SELECT_ROOM } from 'constants'
import { useState } from 'react'
import { lobbyStore, wsStore } from 'store'
import { generateFunnyNickname } from 'utils'

export const useChangeHandler = () => {
  const token = sessionStorage.getItem('token')

  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()
  const [selectedRoom, setSelectedRoom] = useState<string>('')
  const [nickname, setNickname] = useState<string>(() => localStorage.getItem('nickname') || generateFunnyNickname())

  const { presets } = lobbyStore

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= 20) {
      setNickname(value)
    }
  }

  const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoomId = event.target.value
    setSelectedRoom(selectedRoomId)

    if (selectedRoomId && sendJsonMessage) {
      sendJsonMessage({
        type: SELECT_ROOM,
        room_id: selectedRoomId,
        nickname,
        token
      })
    }
  }

  const handlePreset = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPresetDescription = event.target.value
    const preset = presets?.find(p => p.description === selectedPresetDescription)

    if (preset && sendJsonMessage) {
      sendJsonMessage({
        type: PRESELECT,
        token,
        room_id: selectedRoom,
        selected_cards: preset.cards
      })
    }
  }

  return {
    handlePreset,
    handleNicknameChange,
    handleRoomChange,
    selectedRoom
  }
}
