import { PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledSideSeats, StyledTopSeats } from './Seats.styles'
import { SeatsProps } from './Seats.types'

export const SideSeats: React.FC<SeatsProps> = observer(({ cards }) => (
  <StyledSideSeats>
    {cards.map((card, index) => (
      <PlayerCard key={index} card={card} />
    ))}
  </StyledSideSeats>
))

export const TopSeats: React.FC<SeatsProps> = observer(({ cards }) => (
  <StyledTopSeats>
    {cards.map((card, index) => (
      <PlayerCard key={index} card={card} />
    ))}
  </StyledTopSeats>
))
