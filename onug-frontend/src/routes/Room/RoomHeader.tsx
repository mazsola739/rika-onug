import { Header } from 'layouts'
import { observer } from 'mobx-react-lite'
import { Title } from 'typography'

export const RoomHeader: React.ComponentType = observer(() => {
  const room_id = sessionStorage.getItem('room_id')

  return (
    <Header>
      <Title title={`WELCOME IN ${room_id.toLocaleUpperCase().replace('_', ' ')}!`} />
    </Header>
  )
})
