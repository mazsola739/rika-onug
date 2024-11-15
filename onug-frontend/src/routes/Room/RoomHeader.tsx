import { Header } from 'components'
import { observer } from 'mobx-react-lite'

export const RoomHeader: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')

  return <Header>WELCOME IN {room_id.toLocaleUpperCase().replace('_', ' ')}!</Header>
})
