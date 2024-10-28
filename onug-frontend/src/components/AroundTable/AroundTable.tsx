import { PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledAroundTableSide, StyledAroundTableTop } from './AroundTable.styles'
import { AroundTableProps } from './AroundTable.types'

export const AroundTableSide : React.FC<AroundTableProps> = observer(({players}) => (
  <StyledAroundTableSide>
    {players.map(({player_number, player_name, ready}) => (
      <PlayerCard key={player_number} id={0} isCenter={false} ready={ready} position={player_number} playerName={player_name}/>
    ))}
  </StyledAroundTableSide>
))

export const AroundTableTop : React.FC<AroundTableProps> = observer(({players}) => (
  <StyledAroundTableTop>
    {players.map(({player_number, player_name, ready}) => (
      <PlayerCard key={player_number} id={0} isCenter={false} ready={ready} position={player_number} playerName={player_name}/>
    ))}
  </StyledAroundTableTop>
))