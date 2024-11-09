import { Button, ButtonGroup } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { selectionStore } from 'store'
import { AccusedCards } from './AccusedCards'
import { StyledSuspicionCards, SuspicionTitle } from './SuspicionCards.styles'

export const SuspicionCards: React.FC = observer(() => {
  const { handleDone } = useClickHandler()
  const { selectedCards } = selectionStore
  //TODO ℹ️ 🛈 ⓘ ❓tooltipp: you cant vote yourself
  return (
    <StyledSuspicionCards>
      <SuspicionTitle>{'Your Prime Suspect!'}</SuspicionTitle>
      <AccusedCards />
      <ButtonGroup>
        <Button onClick={() => handleDone(selectedCards)} variant="green" buttonText={BUTTONS.done_label} />
      </ButtonGroup>
    </StyledSuspicionCards>
  )
})
