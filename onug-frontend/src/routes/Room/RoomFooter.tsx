import { Button, ButtonGroup, Footer } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { deckStore, roomStore } from 'store'

export const RoomFooter: React.FC = observer(() => {
  const { handleResetGame, handleLeaveRoom, handleJoinTable } = useClickHandler()

  const totalPlayers = deckStore.totalPlayers
  const playersInGame = roomStore.roomPlayers?.length || 0

  const buttonText = totalPlayers > 0 ? `${BUTTONS.deal_label} FOR ${totalPlayers}` : BUTTONS.deal_label

  //TODO unlock the 3 players
  const isButtonDisabled = /* playersInGame < 3 ||  */ playersInGame !== totalPlayers

  return (
    <Footer>
      <ButtonGroup>
        <Button onClick={handleResetGame} buttonText={BUTTONS.reset_game_label} variant="blue" />
        <Button onClick={handleJoinTable} disabled={isButtonDisabled} buttonText={buttonText} variant="green" />
        <Button onClick={handleLeaveRoom} buttonText={BUTTONS.leave_room_label} variant="crimson" />
      </ButtonGroup>
    </Footer>
  )
})
