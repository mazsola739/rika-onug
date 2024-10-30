import { Button, ButtonGroup, GlowingBorder, InfoPanel, QuickGuide } from 'components'
import { BUTTONS } from 'constant'
import { observer } from 'mobx-react-lite'
import { messageStore } from 'store'
import { Message, Narration, Placeholder, StyledInterAction } from './Game.styles'

const InterAction: React.FC = observer(() => {
  const { narration, privateMessage } = messageStore
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
  const { narration } = messageStore

  return (
    <InfoPanel>
      <Placeholder>
        { narration && <GlowingBorder glowColor='#dc3545'><InterAction /></GlowingBorder> }
      </Placeholder>
      <QuickGuide />
    </InfoPanel>
  )
})
