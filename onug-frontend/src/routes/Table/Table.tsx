import { DealtCards, Main } from "components"
import { ARRIVE_DEALING, HYDRATE_DEALING, HYDRATE_READY, REDIRECT, STAGES } from "constant"
import { artifacts } from "data"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deckStore, gameBoardStore, wsStore } from "store"
import { GameArea, StyledTable } from "./Table.styles"
import { tableUtils } from "./Table.utils"
import { TableFooter } from "./TableFooter"
import { TableHeader } from "./TableHeader"

const { renderTokens, /* renderLeftSide, renderRightSide */ } = tableUtils

export const Table: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const token = sessionStorage.getItem('token')

  const { selectedMarks, hasSentinel, hasMarks, hasCurator } = deckStore
  const { setPlayer, setPlayers } = gameBoardStore
  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage({
        type: ARRIVE_DEALING,
        stage: STAGES.DEALING,
        token,
        room_id: sessionStorage.getItem('room_id'),
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_DEALING) {
      setPlayer({
        player_name: lastJsonMessage.player_name,
        player_number: lastJsonMessage.player_number,
        player_card_id: lastJsonMessage.player_card_id,
        player_original_id: lastJsonMessage.player_original_id,
        player_role: lastJsonMessage.player_role,
        player_role_id: lastJsonMessage.player_role_id,
        player_team: lastJsonMessage.player_team,
        player_mark: lastJsonMessage.player_mark,
      })
      setPlayers(lastJsonMessage.board.players)
    }

    if (lastJsonMessage?.type === HYDRATE_READY) {
      setPlayers(lastJsonMessage.board.players)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, setPlayer, setPlayers, navigate])

  return (
    <StyledTable>
      <TableHeader />
{/*       {renderLeftSide()} */}
      <Main>
        <GameArea>
          <DealtCards />
          {(hasCurator || hasSentinel || hasMarks) && renderTokens(artifacts, hasCurator, hasSentinel, selectedMarks)}
        </GameArea>
      </Main>
{/*       {renderRightSide()} */}
      <TableFooter />
    </StyledTable>
  )
})
