import { SideSeats, TopSeats, CenterCards, Main, PlayerCard, RoleTokenList } from 'components'
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
      {tablePlayerCards && <SideSeats cards={left} />}
      {tablePlayerCards && <TopSeats cards={middle} />}
      <Main>
        <CouncilCenter>
          <CenterCards />
          <RoleTokenList />
        </CouncilCenter>
        {tablePlayerCard && <PlayerCard ownCard={true} card={ownCard} cardSize={100} tokenSize={40} />}
      </Main>
      {tablePlayerCards && <SideSeats cards={right} />}
      <CouncilFooter />
      <CouncilInfoPanel />
    </StyledCouncil>
  )
})
