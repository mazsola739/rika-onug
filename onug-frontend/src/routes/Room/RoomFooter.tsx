import { Button, ButtonGroup, Footer } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'

export const RoomFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const totalPlayers = deckStore.totalPlayers
  //TODO player and 'card-players' equal or not

  const buttonText = totalPlayers
    ? `${BUTTONS.deal_label} FOR ${totalPlayers}`
    : BUTTONS.deal_label

  const { handleResetGame, handleLeaveRoom, handleJoinTable } =
    useClickHandler(room_id, token)

  return (
    <Footer>
      <ButtonGroup>
        <Button onClick={handleResetGame} buttonText={BUTTONS.reset_game_label} variant='blue' />
        <Button onClick={handleJoinTable} disabled={!deckStore.totalPlayers} buttonText={buttonText} variant='green' />
        <Button onClick={handleLeaveRoom} buttonText={BUTTONS.leave_room_label} variant='crimson' />
      </ButtonGroup>
    </Footer>
  )
})
