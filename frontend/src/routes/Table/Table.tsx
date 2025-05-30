import { PlayerCard } from 'components'
import { SideSeats, TopSeats, Main, CenterCards } from 'layouts'
import { observer } from 'mobx-react-lite'
import { StyledTable, TableCenter } from './Table.styles'
import { TableFooter } from './TableFooter'
import { TableHeader } from './TableHeader'
import { TableInfoPanel } from './TableInfoPanel'
import { useTable } from './useTable'

export const Table: React.ComponentType = observer(() => {
  const { tablePlayerCards, tablePlayerCard, left, middle, right } = useTable()

  return (
    <StyledTable>
      <TableHeader />
      {tablePlayerCards && <SideSeats cards={left} />}
      {tablePlayerCards && <TopSeats cards={middle} />}
      <Main>
        <TableCenter>
          <CenterCards />
        </TableCenter>
        {tablePlayerCard && <PlayerCard ownCard={true} card={tablePlayerCard} cardSize={100} tokenSize={40} />}
      </Main>
      {tablePlayerCards && <SideSeats cards={right} />}
      <TableFooter />
      <TableInfoPanel />
    </StyledTable>
  )
})
