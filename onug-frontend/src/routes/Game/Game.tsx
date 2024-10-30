import { AroundTableSide, AroundTableTop, CenterCards, Main, PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { GameCenter, StyledGame } from './Game.styles'
import { GameFooter } from './GameFooter'
import { GameHeader } from './GameHeader'
import { GameInfoPanel } from './GameInfoPanel'
import { useGame } from './useGame'

export const Game: React.FC = observer(() => {
  const { tablePlayerCards, tablePlayerCard, left, middle, right, nightMode, setTransitionCompleted } = useGame()

  return (
    <StyledGame animate={nightMode} onAnimationEnd={() => setTransitionCompleted(true)}>
      <GameHeader />
      {tablePlayerCards && <AroundTableSide players={left} />}
      {tablePlayerCards && <AroundTableTop players={middle} />}
      <Main>
        <GameCenter>
          <CenterCards />
        </GameCenter>
        {tablePlayerCard && <PlayerCard card={tablePlayerCard} cardSize={130} tokenSize={50}  />}
      </Main>
      {tablePlayerCards && <AroundTableSide players={right} />}
      <GameFooter />
      <GameInfoPanel />
    </StyledGame>
  )
})
