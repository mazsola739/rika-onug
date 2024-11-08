import { Button, ButtonGroup, Footer } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { gamePropStore, playersStore, selectionStore } from 'store'

export const CouncilFooter: React.FC = observer(() => {
  const { handleReady, handleLeaveGame, handleVoteNow, handleDone } = useClickHandler()
  const { selectedCards } = selectionStore
  const { players } = playersStore

  const isReady = playersStore.isPlayerReady
  const disabled = players.some(player => player.flag === false)

  return (
    <Footer>
      {gamePropStore.selectable_cards.length > 0 ? (
        <ButtonGroup>
          <Button onClick={() => handleDone(selectedCards)} variant="green" buttonText={BUTTONS.done_label} />
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <Button onClick={handleLeaveGame} buttonText={BUTTONS.leave_table_label} variant="red" />
          <Button onClick={handleVoteNow} buttonText={BUTTONS.votenow_button_label} disabled={disabled} variant="orange" />
          <Button onClick={handleReady} variant={isReady ? 'blue' : 'green'} buttonText={isReady ? BUTTONS.im_ready_label : BUTTONS.ready_label} />
        </ButtonGroup>
      )}
    </Footer>
  )
})
