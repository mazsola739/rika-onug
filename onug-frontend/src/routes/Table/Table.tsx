import { AroundTableSide, AroundTableTop, CenterCards, CenterTokens, Main } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledTable, TableCenter } from './Table.styles'
import { TableFooter } from './TableFooter'
import { TableHeader } from './TableHeader'
import { useTable } from './useTable'

export const Table: React.FC = observer(() => {
  const { players, left, middle, right } = useTable()

  return (
    <StyledTable>
      <TableHeader />
      {players && <AroundTableSide players={left} />}
      {players && <AroundTableTop players={middle} />}
      <Main>
        <TableCenter>
          <CenterCards />
          <CenterTokens />
        </TableCenter>
      </Main>
      {players && <AroundTableSide players={right} />}
      <TableFooter />
    </StyledTable>
  )
})
