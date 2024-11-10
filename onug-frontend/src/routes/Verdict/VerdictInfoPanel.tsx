import { CenterCards, InfoPanel, PlayerInfoList } from 'components'
import { observer } from 'mobx-react-lite'

export const VerdictInfoPanel: React.FC = observer(() => {
  return (
    <InfoPanel>
      <span>Center cards</span>
      <CenterCards />
      <PlayerInfoList />
    </InfoPanel>
  )
})
