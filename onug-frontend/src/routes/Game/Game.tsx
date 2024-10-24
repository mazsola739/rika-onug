import { AroundTableSide, AroundTableTop, CenterCards, CenterTokens, Main } from "components"
import { observer } from "mobx-react-lite"
import { StyledGame, TableCenter } from "./Game.styles"
import { GameFooter } from "./GameFooter"
import { GameHeader } from "./GameHeader"
import { useGame } from "./useGame"

export const Game: React.FC = observer(() => {
  const { players, left, middle, right } = useGame()

  return (
    <StyledGame>
      <GameHeader />
      {players && <AroundTableSide players={left} />}
      {players && <AroundTableTop players={middle} />}
      <Main>
        <TableCenter>
          <CenterCards />
          <CenterTokens />
        </TableCenter>
      </Main>
      {players && <AroundTableSide players={right} />}
      <GameFooter />
    </StyledGame>
  )
})
