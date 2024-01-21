import { Footer, FooterButtons, Button, SelectedCardList } from 'components'
import { LEAVE_ROOM, DEAL, RESET, buttons } from 'constant'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { gamePlayStore, selectedDeckStore, wsStore } from 'store'

export const RoomFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')
  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()

  // TODO these clickhandlers could be merged into one clickhandler which get one more information the type
  const handleResetGame = useCallback(() => {
    sendJsonMessage?.({
      type: RESET,
      room_id,
      token,
    })
    gamePlayStore.resetGame()
  }, [sendJsonMessage])

  const handleLeaveRoom = useCallback(() => {
    sendJsonMessage?.({
      type: LEAVE_ROOM,
      room_id,
      token,
    })
  }, [sendJsonMessage])

  const handleToGameTable = useCallback(() => {
    sendJsonMessage?.({
      type: DEAL,
      room_id,
      token,
    })
  }, [sendJsonMessage])

  const totalPlayers = selectedDeckStore.totalPlayers
  const buttonText = totalPlayers
    ? `${buttons.deal_text} FOR ${totalPlayers}`
    : buttons.deal_text

  return (
    <Footer>
      <FooterButtons>
        <Button
          onClick={handleResetGame}
          buttontext={buttons.reset_game_label}
          backgroundColor="#007bff"
        />
        <Button
          onClick={handleToGameTable}
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
