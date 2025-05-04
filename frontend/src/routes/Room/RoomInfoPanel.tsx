import { Squad, RuleInfo, SelectedCardList, Search } from 'components'
import { InfoPanel } from 'layouts'
import { observer } from 'mobx-react-lite'

export const RoomInfoPanel: React.ComponentType = observer(() => {
  return (
    <InfoPanel>
      <Squad />
      <Search />
      <RuleInfo />
      <SelectedCardList />
    </InfoPanel>
  )
})
