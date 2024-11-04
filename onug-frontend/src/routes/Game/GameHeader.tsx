import { Header } from 'components'
import { observer } from 'mobx-react-lite'
import { Moon, StyledGameHeader, Sun, Text } from './Game.styles'

export const GameHeader: React.FC = observer(() => {
  return (
    <Header>
      <StyledGameHeader>
        <Sun src="/assets/logos/sun.webp" alt="sun" />
        <Moon src="/assets/logos/moon.webp" alt="moon" />
        <Text>Night has fallen</Text>
      </StyledGameHeader>
    </Header>
  )
})
