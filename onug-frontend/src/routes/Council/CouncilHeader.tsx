import { CelestialBodies, Header } from 'components'
import { observer } from 'mobx-react-lite'

export const CouncilHeader: React.FC = observer(() => (
  <Header>
    <CelestialBodies dawn={'Sun is up!'} />
  </Header>
))
