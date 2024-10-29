import { PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledAroundTableSide, StyledAroundTableTop } from './AroundTable.styles'
import { AroundTableProps } from './AroundTable.types'

export const AroundTableSide: React.FC<AroundTableProps> = observer(
  ({ players }) => (
    <StyledAroundTableSide>
      {players.map(({ player_number, player_name, player_mark: mark_name, player_card_id: card_id }) => (
        <PlayerCard key={player_number} id={card_id} markName={mark_name} isCenter={false} position={player_number} playerName={player_name} />
      ))}
    </StyledAroundTableSide>
  )
)

export const AroundTableTop: React.FC<AroundTableProps> = observer(
  ({ players }) => (
    <StyledAroundTableTop>
      {players.map(({ player_number, player_name, player_mark: mark_name, player_card_id: card_id }) => (
        <PlayerCard key={player_number} id={card_id} markName={mark_name} isCenter={false} position={player_number} playerName={player_name} />
      ))}
    </StyledAroundTableTop>
  )
)
