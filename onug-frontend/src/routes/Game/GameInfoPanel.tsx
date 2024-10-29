import { Button, ButtonGroup, GlowingBorder, InfoPanel, QuickGuide } from 'components'
import { observer } from 'mobx-react-lite'
import { Placeholder, StyledInterAction, Narration, Message } from './Game.styles'
import { interactionStore } from 'store'
import { BUTTONS } from 'constant'

const InterAction: React.FC = observer(() => {
  const { narration, privateMessage } = interactionStore
  return (
    <StyledInterAction>
      <Narration>{narration}</Narration>
      <Message>{privateMessage}</Message>
      <ButtonGroup>
        <Button onClick={()=>console.log('button1')} buttonText={BUTTONS.skip_label} variant="blue" />
        <Button onClick={()=>console.log('button2')} buttonText={BUTTONS.done_label} variant="green" />
      </ButtonGroup>
    </StyledInterAction>
  )
})

export const GameInfoPanel: React.FC = observer(() => {
  const { narration } = interactionStore

  return (
    <InfoPanel>
      { narration ? <GlowingBorder><InterAction /></GlowingBorder> : <Placeholder>TODO: fun texts like "Did you hear that?"</Placeholder> }
      <QuickGuide />
    </InfoPanel>
  )
})
