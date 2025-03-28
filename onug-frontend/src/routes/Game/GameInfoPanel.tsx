import { InfoPanel, MessageBox, QuickGuide } from 'components'
import { observer } from 'mobx-react-lite'
import { messageStore } from 'store'

export const GameInfoPanel: React.FC = observer(() => {
  const { narration } = messageStore

  return <InfoPanel>{narration ? <MessageBox /> : <QuickGuide />}</InfoPanel>
})
