import { CelestialBodies, Header } from 'components'
import { observer } from 'mobx-react-lite'

export const GameHeader: React.FC = observer(() => {
  return (
    <Header>
      <CelestialBodies dusk={'Night has fallen'} dawn={'Sunrise started'} />
    </Header>
  )
})
