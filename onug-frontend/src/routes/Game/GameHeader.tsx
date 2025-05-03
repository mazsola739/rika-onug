import { CelestialBodies } from 'components'
import { Header } from 'layouts'
import { observer } from 'mobx-react-lite'

export const GameHeader: React.ComponentType = observer(() => {
  return (
    <Header>
      <CelestialBodies dusk={'Night has fallen'} dawn={'Sunrise started'} />
    </Header>
  )
})
