import { Info, InfoPanel, PlayerNames, QuickGuide } from 'components'
import { observer } from 'mobx-react-lite'

export const RoomInfoPanel: React.FC = observer(() => {
  return (
    <InfoPanel>
      <PlayerNames />
      <Info />
      <QuickGuide />
    </InfoPanel>
  )
})
