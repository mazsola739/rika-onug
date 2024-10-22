import { observer } from 'mobx-react-lite'
import { TableSideProps } from './TableSide.types'
import { CardContainer, StyledTableSide } from './TableSide.styles'
import { TableCard } from 'components'


export const TableSide: React.FC<TableSideProps> = observer(({sidePlayers}) => (
  <StyledTableSide>
    {sidePlayers.map(({player_number, player_name, ready}) => (
      <CardContainer key={player_number}>
        <TableCard id={0} isCenter={false} ready={ready} position={player_number} playerName={player_name}/>
      </CardContainer>
    ))}
  </StyledTableSide>
))