import { AroundTableSide, AroundTableTop, CenterCards, Main, PlayerCard, RoleTokenList } from 'components'
import { observer } from 'mobx-react-lite'
import { useCouncil } from './useCouncil'
import { StyledCouncil, CouncilCenter } from './Council.styles'
import { CouncilFooter } from './CouncilFooter'
import { CouncilHeader } from './CouncilHeader'
import { CouncilInfoPanel } from './CouncilInfoPanel'

export const Council: React.FC = observer(() => {
  const { tablePlayerCards, tablePlayerCard, left, middle, right, ownCard } = useCouncil()

  return (
    <StyledCouncil>
      <CouncilHeader />
      {tablePlayerCards && <AroundTableSide cards={left} />}
      {tablePlayerCards && <AroundTableTop cards={middle} />}
      <Main>
        <CouncilCenter>
          <CenterCards />
          <RoleTokenList />
        </CouncilCenter>
        {tablePlayerCard && <PlayerCard card={ownCard} cardSize={120} tokenSize={50} />}
      </Main>
      {tablePlayerCards && <AroundTableSide cards={right} />}
      <CouncilFooter />
      <CouncilInfoPanel />
    </StyledCouncil>
  )
})
