import { Button, ButtonGroup, Footer } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { gamePropStore, playersStore, selectionStore } from 'store'

export const VoteFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { handleReady, handleLeaveGame, handleVoteNow, handleDone } = useClickHandler(room_id, token)
  const { selectedCards } = selectionStore

  const isReady = playersStore.isPlayerReady

  return (
    <Footer>
      {gamePropStore.selectable_cards.length > 0 ? (
        <ButtonGroup>
          <Button onClick={() => handleDone(selectedCards)} variant="green" buttonText={BUTTONS.done_label} />
        </ButtonGroup>
        ) : (
        <ButtonGroup>
          <Button onClick={handleLeaveGame} buttonText={BUTTONS.leave_table_label} variant="red" />
          <Button onClick={handleVoteNow} buttonText={BUTTONS.votenow_button_label} variant="orange" />
          <Button onClick={handleReady} variant={isReady ? 'blue' : 'green'} buttonText={isReady ? BUTTONS.im_ready_label : BUTTONS.ready_label} />
        </ButtonGroup>
        )
      }
    </Footer>
  )
})
