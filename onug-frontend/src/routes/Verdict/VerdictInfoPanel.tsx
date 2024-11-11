import { CenterCardsRevealed, InfoPanel, PlayerInfoList } from 'components'
import { observer } from 'mobx-react-lite'

export const VerdictInfoPanel: React.FC = observer(() => {
  return (
    <InfoPanel>
      <span>Center cards</span>
      <CenterCardsRevealed />
      <span>Players</span>
      <PlayerInfoList />
    </InfoPanel>
  )
})
