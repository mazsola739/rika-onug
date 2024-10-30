import { PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledAroundTableSide, StyledAroundTableTop } from './AroundTable.styles'
import { AroundTableProps } from './AroundTable.types'

export const AroundTableSide: React.FC<AroundTableProps> = observer(
  ({ players }) => (
    <StyledAroundTableSide>
      {players.map((player, index) => (
        <PlayerCard key={index} card={player} />
      ))}
    </StyledAroundTableSide>
  )
)

export const AroundTableTop: React.FC<AroundTableProps> = observer(
  ({ players }) => (
    <StyledAroundTableTop>
      {players.map((player, index) => (
        <PlayerCard key={index} card={player}  />
      ))}
    </StyledAroundTableTop>
  )
)
