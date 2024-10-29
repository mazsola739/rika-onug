import { AroundTableSide, AroundTableTop, CenterCards, CenterTokens, Main, PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { playersStore } from 'store'
import { StyledTable, TableCenter } from './Table.styles'
import { TableFooter } from './TableFooter'
import { TableHeader } from './TableHeader'
import { TableInfoPanel } from './TableInfoPanel'
import { useTable } from './useTable'

export const Table: React.FC = observer(() => {
  const { tablePlayer, tablePlayers, left, middle, right } = useTable()

  return (
    <StyledTable>
      <TableHeader />
      {tablePlayers && <AroundTableSide players={left} />}
      {tablePlayers && <AroundTableTop players={middle} />}
      <Main>
        <TableCenter>
          <CenterCards />
          <CenterTokens />
        </TableCenter>
        {tablePlayer && <PlayerCard id={tablePlayer.player_card_id} markName={tablePlayer.player_mark} isCenter={false} cardSize={130} tokenSize={50} position={tablePlayer.player_number}/>}
      </Main>
      {tablePlayers && <AroundTableSide players={right} />}
      <TableFooter />
      <TableInfoPanel />
    </StyledTable>
  )
})
