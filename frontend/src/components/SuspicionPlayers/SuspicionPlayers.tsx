import { Button, ButtonGroup } from 'components'
import { button_label_done } from 'constants'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { selectionStore, messageStore } from 'store'
import { Title } from 'typography'
import { AccusedPlayers } from './AccusedPlayers'
import { StyledSuspicionPlayers } from './SuspicionPlayers.styles'

export const SuspicionPlayers: React.ComponentType = observer(() => {
  const { handleAccuse } = useClickHandler()
  const { selectedCards } = selectionStore
  const { disabledCards: disabled } = messageStore
  //TODO ℹ️ 🛈 ⓘ ❓tooltips: you cant vote yourself
  return (
    <StyledSuspicionPlayers>
      <Title title={'YOUR PRIME SUSPECT!'} />
      <AccusedPlayers />
      <ButtonGroup>
        <Button onClick={() => handleAccuse(selectedCards)} variant='green' buttonText={button_label_done} disabled={disabled} />
      </ButtonGroup>
    </StyledSuspicionPlayers>
  )
})
