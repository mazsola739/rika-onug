import { QuickGuide } from 'components'
import { InfoPanel, MessageBox } from 'layouts'
import { observer } from 'mobx-react-lite'
import { messageStore } from 'store'

export const GameInfoPanel: React.ComponentType = observer(() => {
  const { narration } = messageStore

  return <InfoPanel>{narration ? <MessageBox /> : <QuickGuide />}</InfoPanel>
})
