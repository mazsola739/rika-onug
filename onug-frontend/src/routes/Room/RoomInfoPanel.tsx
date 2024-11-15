import { InfoPanel, RuleInfo, SelectedCardList, Squad } from 'components'
import { observer } from 'mobx-react-lite'

export const RoomInfoPanel: React.FC = observer(() => {
  return (
    <InfoPanel>
      <Squad />
      <RuleInfo />
      <span>SELECTED CARDS</span>
      <SelectedCardList />
    </InfoPanel>
  )
})
