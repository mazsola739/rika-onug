import { InfoPanel, RuleInfo, SelectedCardList, Squad } from 'components'
import { observer } from 'mobx-react-lite'

export const RoomInfoPanel: React.ComponentType = observer(() => {
  return (
    <InfoPanel>
      <Squad />
      <RuleInfo />
      <SelectedCardList />
    </InfoPanel>
  )
})
