import { observer } from 'mobx-react-lite'
import { EveningSky, Moon, MorningSky, StyledCelestialBodies, Sun } from './CelestialBodies.styles'
import { CelestialBodiesProps } from './CelestialBodies.types'

export const CelestialBodies: React.ComponentType<CelestialBodiesProps> = observer(({ dusk, dawn }) => {
  return (
    <StyledCelestialBodies>
      <Sun src='/assets/logos/sun.webp' alt='sun' />
      <Moon src='/assets/logos/moon.webp' alt='moon' />
      <EveningSky>{dusk}</EveningSky>
      <MorningSky>{dawn}</MorningSky>
    </StyledCelestialBodies>
  )
})
