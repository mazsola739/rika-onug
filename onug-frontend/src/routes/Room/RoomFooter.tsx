import {
  Footer,
  FooterButtons,
  Button,
  LinkButton,
  SelectedCardList,
} from 'components'
import { LEAVE_ROOM, PLAY_GAME, RESET, buttons } from 'constant'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect } from 'react'
import { gamePlayStore, roomStore, selectedDeckStore } from 'store'
import { useNavigate } from 'react-router-dom'

export const RoomFooter = observer(() => {
  const navigate = useNavigate()
  const lastJsonMessage = roomStore.getLastJsonMessage()
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')
  const sendJsonMessage = roomStore.getSendJsonMessage()

  useEffect(() => {
    console.log(lastJsonMessage.type)
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

  const handleResetGame = useCallback(() => {
    sendJsonMessage({
      type: RESET,
      room_id,
      token,
    })
    gamePlayStore.resetGame()
  }, [])

  const handleLeaveRoom = () => {
    sendJsonMessage({
      type: LEAVE_ROOM,
      room_id,
      token,
    })
  }

  const handleStartGame = useCallback(() => {
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
        <LinkButton
          linkTo={`/gametable/${room_id}`} //TODO
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
