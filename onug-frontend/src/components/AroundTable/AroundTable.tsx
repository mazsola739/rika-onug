import { PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { CardContainer, StyledAroundTableSide, StyledAroundTableTop } from './AroundTable.styles'
import { AroundTableProps } from './AroundTable.types'


export const AroundTableSide : React.FC<AroundTableProps> = observer(({players}) => (
  <StyledAroundTableSide>
    {players.map(({player_number, player_name, ready}) => (
      <CardContainer key={player_number}>
        <PlayerCard id={0} isCenter={false} ready={ready} position={player_number} playerName={player_name}/>
      </CardContainer>
    ))}
  </StyledAroundTableSide>
))

export const AroundTableTop : React.FC<AroundTableProps> = observer(({players}) => (
  <StyledAroundTableTop>
    {players.map(({player_number, player_name, ready}) => (
      <CardContainer key={player_number}>
        <PlayerCard id={0} isCenter={false} ready={ready} position={player_number} playerName={player_name}/>
      </CardContainer>
    ))}
  </StyledAroundTableTop>
))