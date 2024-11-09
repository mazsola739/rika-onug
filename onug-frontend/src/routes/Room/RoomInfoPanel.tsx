import { RuleInfo, InfoPanel, Squad, QuickGuide } from 'components'
import { observer } from 'mobx-react-lite'

export const RoomInfoPanel: React.FC = observer(() => {
  return (
    <InfoPanel>
      <Squad />
      <RuleInfo />
      <QuickGuide />
    </InfoPanel>
  )
})
