import { Button, ButtonGroup, GlowingBorder, InfoPanel, QuickGuide } from 'components'
import { BUTTONS } from 'constant'
import { observer } from 'mobx-react-lite'
import { gamePropStore, messageStore } from 'store'
import { Message, Narration, Placeholder, StyledInterAction } from './Game.styles'

const InterAction: React.FC = observer(() => {
  const { narration, privateMessage } = messageStore
  return (
    <StyledInterAction>
      <Narration>{narration}</Narration>
      <Message>{privateMessage}</Message>
      <ButtonGroup>
        <Button onClick={()=>console.log('button1')} disabled={gamePropStore.obligatory} buttonText={BUTTONS.skip_label} variant="blue" />
        <Button onClick={()=>console.log('button2')} disabled={!gamePropStore.obligatory} buttonText={BUTTONS.done_label} variant='green' />
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
