import { AroundTableSide, AroundTableTop, CenterCards, CenterTokens, Main, PlayerCard } from 'components'
import { observer } from 'mobx-react-lite'
import { GameCenter, StyledGame } from './Game.styles'
import { GameFooter } from './GameFooter'
import { GameHeader } from './GameHeader'
import { GameInfoPanel } from './GameInfoPanel'
import { useGame } from './useGame'

export const Game: React.FC = observer(() => {
  const { tablePlayers, tablePlayer, left, middle, right, nightMode, setTransitionCompleted } = useGame()

  return (
    <StyledGame animate={nightMode} onAnimationEnd={() => setTransitionCompleted(true)}>
      <GameHeader />
      {tablePlayers && <AroundTableSide players={left} />}
      {tablePlayers && <AroundTableTop players={middle} />}
      <Main>
        <GameCenter>
          <CenterCards />
          <CenterTokens />
        </GameCenter>
        {tablePlayer && <PlayerCard id={tablePlayer.player_card_id} markName={tablePlayer.player_mark} isCenter={false} cardSize={130} tokenSize={50} position={tablePlayer.player_number} />}
      </Main>
      {tablePlayers && <AroundTableSide players={right} />}
      <GameFooter />
      <GameInfoPanel />
    </StyledGame>
  )
})
