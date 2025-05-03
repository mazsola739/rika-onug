import { ButtonGroup, Button } from 'components'
import { button_label_deal, button_label_reset, button_label_leave } from 'constants'
import { useClickHandler } from 'hooks'
import { Footer } from 'layouts'
import { observer } from 'mobx-react-lite'
import { deckStore, roomStore } from 'store'


export const RoomFooter: React.ComponentType = observer(() => {
  const { handleResetGame, handleLeaveRoom, handleJoinTable } = useClickHandler()

  const totalPlayers = deckStore.totalPlayers
  const playersInGame = roomStore.roomPlayers?.length || 0

  const buttonText = totalPlayers > 0 ? `${button_label_deal} FOR ${totalPlayers}` : button_label_deal

  //TODO unlock the 3 players
  const isButtonDisabled = /* playersInGame < 3 ||  */ playersInGame !== totalPlayers

  return (
    <Footer>
      <ButtonGroup>
        <Button onClick={handleResetGame} buttonText={button_label_reset} variant='blue' />
        <Button onClick={handleJoinTable} disabled={isButtonDisabled} buttonText={buttonText} variant='green' />
        <Button onClick={handleLeaveRoom} buttonText={button_label_leave} variant='crimson' />
      </ButtonGroup>
    </Footer>
  )
})
