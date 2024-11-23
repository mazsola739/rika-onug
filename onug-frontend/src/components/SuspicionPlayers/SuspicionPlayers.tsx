import { Button, ButtonGroup, Title } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { messageStore, selectionStore } from 'store'
import { AccusedPlayers } from './AccusedPlayers'
import { StyledSuspicionPlayers } from './SuspicionPlayers.styles'

export const SuspicionPlayers: React.FC = observer(() => {
  const { handleAccuse } = useClickHandler()
  const { selectedCards } = selectionStore
  const { disabledCards: disabled } = messageStore
  //TODO ℹ️ 🛈 ⓘ ❓tooltipp: you cant vote yourself
  return (
    <StyledSuspicionPlayers>
      <Title title={'YOUR PRIME SUSPECT!'} />
      <AccusedPlayers />
      <ButtonGroup>
        <Button onClick={() => handleAccuse(selectedCards)} variant="green" buttonText={BUTTONS.done_label} disabled={disabled} />
      </ButtonGroup>
    </StyledSuspicionPlayers>
  )
})
