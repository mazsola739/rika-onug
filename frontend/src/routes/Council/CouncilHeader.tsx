import { CelestialBodies } from 'components';
import { Header } from 'layouts';
import { observer } from 'mobx-react-lite';

export const CouncilHeader: React.ComponentType = observer(() => (
  <Header>
    <CelestialBodies dawn={'Sun is up!'} />
  </Header>
))
