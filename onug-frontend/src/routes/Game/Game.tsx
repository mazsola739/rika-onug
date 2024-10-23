import { AroundTableSide, AroundTableTop, CenterCards, CenterTokens, Main } from "components"
import { ARRIVE_GAME, HYDRATE_GAME, MESSAGE, PAUSE_GAME, REDIRECT, SCENE, STAGES } from "constant"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { boardStore, gamePlayStore, interactionStore, narrationStore, wsStore } from "store"
import { splitPlayersToTable } from "utils"
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
