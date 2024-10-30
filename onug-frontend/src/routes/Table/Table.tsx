import { AroundTableSide, AroundTableTop, CenterCards, CenterTokens, Main, PlayerCard } from 'components'
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
      {tablePlayerCards && <AroundTableSide players={left} />}
      {tablePlayerCards && <AroundTableTop players={middle} />}
      <Main>
        <TableCenter>
          <CenterCards />
          <CenterTokens />
        </TableCenter>
        {tablePlayerCard && <PlayerCard card={tablePlayerCard} cardSize={130} tokenSize={50} />}
      </Main>
      {tablePlayerCards && <AroundTableSide players={right} />}
      <TableFooter />
      <TableInfoPanel />
    </StyledTable>
  )
})
