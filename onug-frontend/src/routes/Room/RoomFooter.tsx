import { Footer, FooterButtons, Button, SelectedCardList } from 'components'
import { LEAVE_ROOM, DEAL, RESET, buttons } from 'constant'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { gamePlayStore, selectedDeckStore, wsStore } from 'store'

export const RoomFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()
  const totalPlayers = selectedDeckStore.totalPlayers

  const buttonText = totalPlayers
    ? `${buttons.deal_label} FOR ${totalPlayers}`
    : buttons.deal_label

  // TODO these click handlers could be merged into one click handler which get one more information the type
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

  return (
    <Footer>
      <FooterButtons>
        <Button
          onClick={handleResetGame}
          buttonText={buttons.reset_game_label}
          variant="blue"
        />
        <Button
          onClick={handleToGameTable}
          disabled={!selectedDeckStore.totalPlayers}
          buttonText={buttonText}
          variant="green"
        />
        <Button
          onClick={handleLeaveRoom}
          buttonText="LEAVE ROOM"
          variant="crimson"
        />
      </FooterButtons>
      <SelectedCardList />
    </Footer>
  )
})
