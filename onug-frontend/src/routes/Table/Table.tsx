import { Main, TableCenterCards, TableSide } from "components"
import { ARRIVE_DEALING, HYDRATE_READY, HYDRATE_TABLE, REDIRECT, STAGES } from "constant"
import { artifacts } from "data"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { boardStore, deckStore, wsStore } from "store"
import { GameArea, StyledTable } from "./Table.styles"
import { tableUtils } from "./Table.utils"
import { TableFooter } from "./TableFooter"
import { TableHeader } from "./TableHeader"

const { renderTokens, splitPlayersToLeftAndRightSide } = tableUtils

export const Table: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const token = sessionStorage.getItem('token')

  const { selectedMarks, hasSentinel, hasMarks, hasCurator } = deckStore
  const { setPlayer, setPlayers, players, player } = boardStore
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
    if (lastJsonMessage?.type === HYDRATE_TABLE) {
      setPlayer({
        player_name: lastJsonMessage.player.player_name,
        player_number: lastJsonMessage.player.player_number,
        player_card_id: lastJsonMessage.player.player_card_id,
        player_original_id: lastJsonMessage.player.player_original_id,
        player_role: lastJsonMessage.player.player_role,
        player_role_id: lastJsonMessage.player.player_role_id,
        player_team: lastJsonMessage.player.player_team,
        player_mark: lastJsonMessage.player.player_mark,
      })
      setPlayers(lastJsonMessage.players)
    }

    if (lastJsonMessage?.type === HYDRATE_READY) {
      setPlayers(lastJsonMessage.players)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, setPlayer, setPlayers, navigate])

  const sides = players && player ? splitPlayersToLeftAndRightSide(players, player) : null
  const { left = [], right = [] } = sides || {}

  return (
    <StyledTable>
      <TableHeader />
      {players && player && <TableSide sidePlayers={left} />}
      <Main>
        <GameArea>
          <TableCenterCards />
          {(hasCurator || hasSentinel || hasMarks) && renderTokens(artifacts, hasCurator, hasSentinel, selectedMarks)}
        </GameArea>
      </Main>
      {players && player && <TableSide sidePlayers={right} />}
      <TableFooter />
    </StyledTable>
  )
})
