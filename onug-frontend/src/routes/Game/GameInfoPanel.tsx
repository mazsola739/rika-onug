import { InfoPanel, QuickGuide } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledInterAction } from './Game.styles'
import { interactionStore } from 'store'

const InterAction: React.FC = observer(() => {
  const { narration, privateMessage } = interactionStore
  return (
    <StyledInterAction>
      <div>{narration}</div>
      <div>{privateMessage}</div>
    </StyledInterAction>
  )
})

export const GameInfoPanel: React.FC = observer(() => {
  return (
    <InfoPanel>
      <InterAction />
      <QuickGuide />
    </InfoPanel>
  )
})
