import { Button, ButtonGroup, Title } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { messageStore, selectionStore } from 'store'
import { AccusedCards } from './AccusedCards'
import { StyledSuspicionCards } from './SuspicionCards.styles'

export const SuspicionCards: React.FC = observer(() => {
  const { handleAccuse } = useClickHandler()
  const { selectedCards } = selectionStore
  const { disabled } = messageStore
  //TODO ℹ️ 🛈 ⓘ ❓tooltipp: you cant vote yourself
  return (
    <StyledSuspicionCards>
      <Title title={'YOUR PRIME SUSPECT!'} />
      <AccusedCards />
      <ButtonGroup>
        <Button onClick={() => handleAccuse(selectedCards)} variant="green" buttonText={BUTTONS.done_label} disabled={disabled} />
      </ButtonGroup>
    </StyledSuspicionCards>
  )
})
