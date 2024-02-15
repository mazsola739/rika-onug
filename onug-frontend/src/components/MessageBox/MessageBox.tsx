import { observer } from 'mobx-react-lite'
import { Message, SendButton, StyledMessageBox } from './MessageBox.styles'

import { interactionStore } from 'store'

export const MessageBox: React.FC = observer(() => {
  const message = interactionStore.lastJsonMessage.message
  const selectable_cards =
    interactionStore.lastJsonMessage.selectable_cards || []
  const masons = interactionStore.lastJsonMessage.mason || []
  const werewolves = interactionStore.lastJsonMessage.werewolf || []

  //selected
  const selected_cards = interactionStore.selectedCards || []

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
      </SendButton>
    </StyledMessageBox>
  )
})
