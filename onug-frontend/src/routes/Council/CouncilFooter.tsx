import { Button, ButtonGroup, Footer } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { propStore, playersStore, selectionStore, voteStore, messageStore } from 'store'

export const CouncilFooter: React.FC = observer(() => {
  const { handleReady, handleLeaveGame, handleVoteNow, handleAccuse } = useClickHandler()
  const { selectedCards } = selectionStore
  const { players } = playersStore
  const { disabled } = messageStore
  const { end } = propStore

  //TODO FIX ready
  const isReady = playersStore.isPlayerReady
  const disabledVote = players.some(player => player.flag === false)

  return (
    <Footer>
      {propStore.selectable_cards.length > 0 ? (
        <ButtonGroup>{!end && <Button onClick={() => handleAccuse(selectedCards)} variant="green" buttonText={BUTTONS.done_label} disabled={disabled} />}</ButtonGroup>
      ) : (
        !end && (
          <ButtonGroup>
            <Button onClick={handleLeaveGame} buttonText={BUTTONS.back_label} variant="red" />
            <Button onClick={handleVoteNow} buttonText={BUTTONS.votenow_button_label} disabled={disabledVote} variant="orange" />
            <Button onClick={handleReady} variant={isReady ? 'blue' : 'green'} buttonText={isReady ? BUTTONS.im_ready_label : BUTTONS.ready_label} />
          </ButtonGroup>
        )
      )}
    </Footer>
  )
})
