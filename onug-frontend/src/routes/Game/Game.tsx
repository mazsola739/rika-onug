import { SideSeats, TopSeats, CenterCards, Main, PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { GameCenter, StyledGame } from './Game.styles'
import { GameFooter } from './GameFooter'
import { GameHeader } from './GameHeader'
import { GameInfoPanel } from './GameInfoPanel'
import { useGame } from './useGame'
import { propStore } from 'store'

export const Game: React.FC = observer(() => {
  const { tablePlayerCards, tablePlayerCard, left, middle, right, ownCard, setTransitionCompleted } = useGame()

  return (
    <StyledGame nightfall={propStore.nightfall} sunrise={propStore.sunrise} onAnimationEnd={() => setTransitionCompleted(true)}>
      <GameHeader />
      {tablePlayerCards && <SideSeats cards={left} />}
      {tablePlayerCards && <TopSeats cards={middle} />}
      <Main>
        <GameCenter>
          <CenterCards />
        </GameCenter>
        {tablePlayerCard && <PlayerCard ownCard={true} card={ownCard} cardSize={100} tokenSize={40} />}
      </Main>
      {tablePlayerCards && <SideSeats cards={right} />}
      <GameFooter />
      <GameInfoPanel />
    </StyledGame>
  )
})
