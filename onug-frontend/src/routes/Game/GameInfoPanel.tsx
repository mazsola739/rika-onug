import { InfoPanel, MessageBox, QuickGuide } from 'components'
import { observer } from 'mobx-react-lite'
import { messageStore } from 'store'
import { Placeholder } from './Game.styles'

export const GameInfoPanel: React.FC = observer(() => {
  const { narration } = messageStore

  return (
    <InfoPanel>
      <Placeholder>
        { narration && <MessageBox /> }
      </Placeholder>
      <QuickGuide />
    </InfoPanel>
  )
})
