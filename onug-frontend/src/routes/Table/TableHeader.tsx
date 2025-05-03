import { CelestialBodies } from 'components'
import { Header } from 'layouts'
import { observer } from 'mobx-react-lite'

export const TableHeader: React.ComponentType = observer(() => {
  return (
    <Header>
      <CelestialBodies dawn={'The sun is up!'} />
    </Header>
  )
})
