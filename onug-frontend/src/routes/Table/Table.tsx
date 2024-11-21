import { AroundTableSide, AroundTableTop, CenterCards, Main, PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledTable, TableCenter } from './Table.styles'
import { TableFooter } from './TableFooter'
import { TableHeader } from './TableHeader'
import { TableInfoPanel } from './TableInfoPanel'
import { useTable } from './useTable'

export const Table: React.FC = observer(() => {
  const { tablePlayerCards, tablePlayerCard, left, middle, right } = useTable()

  return (
    <StyledTable>
      <TableHeader />
      {tablePlayerCards && <AroundTableSide cards={left} />}
      {tablePlayerCards && <AroundTableTop cards={middle} />}
      <Main>
        <TableCenter>
          <CenterCards />
        </TableCenter>
        {tablePlayerCard && <PlayerCard ownCard={true} card={tablePlayerCard} cardSize={100} tokenSize={40} />}
      </Main>
      {tablePlayerCards && <AroundTableSide cards={right} />}
      <TableFooter />
      <TableInfoPanel />
    </StyledTable>
  )
})
