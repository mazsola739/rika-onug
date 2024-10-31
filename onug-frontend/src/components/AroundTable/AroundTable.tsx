import { PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledAroundTableSide, StyledAroundTableTop } from './AroundTable.styles'
import { AroundTableProps } from './AroundTable.types'

export const AroundTableSide: React.FC<AroundTableProps> = observer(
  ({ cards }) => (
    <StyledAroundTableSide>
      {cards.map((card, index) => (
        <PlayerCard key={index} card={card} />
      ))}
    </StyledAroundTableSide>
  )
)

export const AroundTableTop: React.FC<AroundTableProps> = observer(
  ({ cards }) => (
    <StyledAroundTableTop>
      {cards.map((card, index) => (
        <PlayerCard key={index} card={card}  />
      ))}
    </StyledAroundTableTop>
  )
)
