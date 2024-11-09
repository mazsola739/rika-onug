import { Button, ButtonGroup, Footer } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { propStore, playersStore, selectionStore, voteStore } from 'store'

export const CouncilFooter: React.FC = observer(() => {
  const { handleReady, handleLeaveGame, handleVoteNow, handleAccuse } = useClickHandler()
  const { selectedCards } = selectionStore
  const { players } = playersStore

  //TODO FIX ready
  const isReady = playersStore.isPlayerReady
  const disabled = players.some(player => player.flag === false)

  return (
    <Footer>
      {propStore.selectable_cards.length > 0 ? (
        <ButtonGroup>
          <Button onClick={() => handleAccuse(selectedCards)} variant="green" buttonText={BUTTONS.done_label} />
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <Button onClick={handleLeaveGame} buttonText={BUTTONS.back_label} variant="red" />
          <Button onClick={handleVoteNow} buttonText={BUTTONS.votenow_button_label} disabled={disabled} variant="orange" />
          <Button onClick={handleReady} variant={isReady ? 'blue' : 'green'} buttonText={isReady ? BUTTONS.im_ready_label : BUTTONS.ready_label} />
        </ButtonGroup>
      )}
    </Footer>
  )
})
