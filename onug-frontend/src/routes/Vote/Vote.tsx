import { AroundTableSide, AroundTableTop, CenterCards, Main, PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { useVote } from './useVote'
import { StyledVote, VoteCenter } from './Vote.styles'
import { VoteFooter } from './VoteFooter'
import { VoteHeader } from './VoteHeader'
import { VoteInfoPanel } from './VoteInfoPanel'

export const Vote: React.FC = observer(() => {
  const { tablePlayerCards, tablePlayerCard, left, middle, right } = useVote()

  return (
    <StyledVote>
      <VoteHeader />
      {tablePlayerCards && <AroundTableSide cards={left} />}
      {tablePlayerCards && <AroundTableTop cards={middle} />}
      <Main>
      <VoteCenter>
        <CenterCards />
      </VoteCenter>
      {tablePlayerCard && <PlayerCard card={tablePlayerCard} cardSize={130} tokenSize={50}  />}
      </Main>
      {tablePlayerCards && <AroundTableSide cards={right} />}
      <VoteFooter />
      <VoteInfoPanel />
    </StyledVote>
  )
})
