import { Footer, FooterButtons, Button } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { SelectedCardList } from '../../modules/SelectedCardList/SelectedCardList'

export const RoomFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const totalPlayers = deckStore.totalPlayers

  const buttonText = totalPlayers
    ? `${BUTTONS.deal_label} FOR ${totalPlayers}`
    : BUTTONS.deal_label

  const { handleResetGame, handleLeaveRoom, handleToGameTable } = useClickHandler(room_id, token)

  return (
    <Footer>
      <FooterButtons>
        <Button onClick={handleResetGame} buttonText={BUTTONS.reset_game_label} variant="blue" />
        <Button onClick={handleToGameTable} disabled={!deckStore.totalPlayers} buttonText={buttonText} variant="green" />
        <Button onClick={handleLeaveRoom} buttonText="LEAVE ROOM" variant="crimson" />
      </FooterButtons>
      <SelectedCardList />
    </Footer>
  )
})
