import { Header } from 'components'
import { observer } from 'mobx-react-lite'
import { Sun } from './Table.styles'


export const TableHeader: React.FC = observer(() => {

//TODO
    return (
      <Header>
        <Sun src="/assets/logos/sun.png" alt="sun" /> The sun is up!
      </Header>
    )
  }
)
