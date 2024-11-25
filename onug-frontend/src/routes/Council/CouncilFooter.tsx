import { Button, ButtonGroup, Footer } from 'components'
import { button_label_back, button_label_done, button_label_im_ready, button_label_ready, button_label_votenow } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { messageStore, playersStore, propStore, selectionStore } from 'store'

export const CouncilFooter: React.FC = observer(() => {
  const { handleReady, handleLeaveGame, handleVoteNow, handleAccuse } = useClickHandler()
  const { selectedCards } = selectionStore
  const { players } = playersStore
  const { disabledCards: disabled } = messageStore
  const { end } = propStore

  //TODO FIX ready
  const isReady = playersStore.isPlayerReady
  const disabledVote = players.some(player => player.flag === false)

  return (
    <Footer>
      {propStore.selectable_cards.length > 0 ? (
        <ButtonGroup>{!end && <Button onClick={() => handleAccuse(selectedCards)} variant="green" buttonText={button_label_done} disabled={disabled} />}</ButtonGroup>
      ) : (
        !end && (
          <ButtonGroup>
            <Button onClick={handleLeaveGame} buttonText={button_label_back} variant="red" />
            <Button onClick={handleVoteNow} buttonText={button_label_votenow} disabled={disabledVote} variant="orange" />
            <Button onClick={handleReady} variant={isReady ? 'blue' : 'green'} buttonText={isReady ? button_label_im_ready : button_label_ready} />
          </ButtonGroup>
        )
      )}
    </Footer>
  )
})
