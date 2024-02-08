import { observer } from 'mobx-react-lite'
import { Message, SendButton, StyledMessageBox } from './MessageBox.styles'
import { MessageBoxProps } from './MessageBox.types'
import { useClickHandler } from 'hooks'
import { Button } from 'components'
import { interactionStore } from 'store'

export const MessageBox: React.FC<MessageBoxProps> = observer(
  ({ room_id, token }) => {
    const { handleInteraction } = useClickHandler(room_id, token)
    const message = interactionStore.lastJsonMessage.message
    const selectable_cards =
      interactionStore.lastJsonMessage.selectable_cards || []
    const masons = interactionStore.lastJsonMessage.masons || []
    const werewolves = interactionStore.lastJsonMessage.werewolves || []

    //selected
    const selected_cards = interactionStore.selectedCards || []

    const handleClick = () => {
      handleInteraction(selected_cards)
    }

    return (
      <StyledMessageBox>
        <Message>
          {message} {selectable_cards.length > 0 && selectable_cards.join(' ,')}{' '}
          {masons.length > 0 && masons.join(' ,')}{' '}
          {werewolves.length > 0 && werewolves.join(' ,')}
        </Message>
        <SendButton>
          What i want here:{' '}
          {selected_cards.length > 0 && selected_cards.join(' ,')}
          <Button
            onClick={handleClick}
            buttonText={'Nyiiihaaaa'}
            variant="magenta"
          />
        </SendButton>
      </StyledMessageBox>
    )
  }
)
