import { Footer, FooterButtons, Button, SelectedCardList } from 'components'
import { LEAVE_ROOM, PLAY_GAME, RESET, buttons } from 'constant'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect } from 'react'
import { gamePlayStore, roomStore, selectedDeckStore, wsStore } from 'store'
import { useNavigate } from 'react-router-dom'

export const RoomFooter = observer(() => {
  const navigate = useNavigate()
  const { lastJsonMessage } = wsStore.getWsCommunicationsBridge()
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (lastJsonMessage?.type === LEAVE_ROOM) {
      if (lastJsonMessage.success) {
        sessionStorage.setItem('room_id', '')
        sessionStorage.setItem('player_name', '')
        navigate('/lobby')
      } else {
        console.error(lastJsonMessage.errors)
      }
    }
  }, [lastJsonMessage])

  useEffect(() => {
    if (lastJsonMessage?.type === PLAY_GAME) {
      if (lastJsonMessage.success) {
        navigate(`/gametable/${room_id}`)
      } else {
        console.error(lastJsonMessage.errors)
      }
    }
  }, [lastJsonMessage])

  const handleResetGame = useCallback(() => {
    const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()
    sendJsonMessage({
      type: RESET,
      room_id,
      token,
    })
    gamePlayStore.resetGame()
  }, [])

  const handleLeaveRoom = () => {
    const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()
    sendJsonMessage({
      type: LEAVE_ROOM,
      room_id,
      token,
    })
  }

  const handleStartGame = useCallback(() => {
    const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()
    sendJsonMessage({
      type: PLAY_GAME,
      room_id,
      token,
    })
    gamePlayStore.toggleGameStatus()
    roomStore.resetDetailedCardInfo()
    selectedDeckStore.addCardIdsToArray()
  }, [])

  const totalPlayers = selectedDeckStore.totalPlayers
  const buttonText = totalPlayers
    ? `${buttons.play_game_text}${totalPlayers}`
    : buttons.play_game_text

  return (
    <Footer>
      <FooterButtons>
        <Button
          onClick={handleResetGame}
          buttontext={buttons.reset_game_label}
          backgroundColor="#007bff"
        />
        <Button
          onClick={handleStartGame}
          disabled={!selectedDeckStore.totalPlayers}
          buttontext={buttonText}
          backgroundColor="#28a745"
        />
        <Button
          onClick={handleLeaveRoom}
          buttontext="LEAVE ROOM"
          backgroundColor="#dc3545"
        />
      </FooterButtons>
      <SelectedCardList />
    </Footer>
  )
})
