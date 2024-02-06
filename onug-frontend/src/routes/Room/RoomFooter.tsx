import { Footer, FooterButtons, Button, SelectedCardList } from 'components'
import { buttons } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'

export const RoomFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const totalPlayers = deckStore.totalPlayers

  const buttonText = totalPlayers
    ? `${buttons.deal_label} FOR ${totalPlayers}`
    : buttons.deal_label

  const { handleResetGame, handleLeaveRoom, handleToGameTable } =
    useClickHandler(room_id, token)

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
          disabled={!deckStore.totalPlayers}
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
