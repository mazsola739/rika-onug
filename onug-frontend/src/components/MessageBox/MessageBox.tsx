import { Button, ButtonGroup } from 'components'
import { BUTTONS } from 'constant'
import { observer } from 'mobx-react-lite'
import { gamePropStore, messageStore, selectionStore } from 'store'
import { Message, Narration, StyledMessageBox } from './MessageBox.styles'
import { useClickHandler } from 'hooks'

export const MessageBox: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { handleCardInteraction } = useClickHandler(room_id, token)
  const { narration, privateMessage } = messageStore
  const { selectable_cards, selectable_card_limit, title } = gamePropStore
  const { selectedCards } = selectionStore

  const playerCardLimit = selectable_card_limit.player
  const centerCardLimit = selectable_card_limit.center

  return (
    <StyledMessageBox>
      <Narration>{narration}</Narration>
      <Message>{privateMessage}</Message>
      <div>selectable_cards: {selectable_cards.join(', ')}</div>
      <div>selectedCards: {selectedCards}</div>
      <ButtonGroup>
        <Button
          onClick={() => console.log('nothing')}
          disabled={gamePropStore.obligatory}
          buttonText={BUTTONS.skip_label}
          variant="blue"
        />
        <Button
          onClick={() => handleCardInteraction(selectedCards, title)}
          disabled={selectedCards.length === playerCardLimit!}
          buttonText={BUTTONS.done_label}
          variant="green"
        />
      </ButtonGroup>
    </StyledMessageBox>
  )
})
