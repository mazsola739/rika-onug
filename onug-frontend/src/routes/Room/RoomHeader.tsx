import { Header, SelectedCardList } from 'components'
import { observer } from 'mobx-react-lite'

export const RoomHeader: React.FC = observer(() => (
  <Header>
    <SelectedCardList />
  </Header>
))
