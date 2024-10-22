import { CenterCards, Main } from "components"
import { ARRIVE_DEALING, HYDRATE_TABLE, HYDRATE_READY, REDIRECT, STAGES } from "constant"
import { artifacts } from "data"
import { observer } from "mobx-react-lite"
import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deckStore, boardStore, wsStore } from "store"
import { GameArea, StyledSide, StyledTable } from "./Table.styles"
import { tableUtils } from "./Table.utils"
import { TableFooter } from "./TableFooter"
import { TableHeader } from "./TableHeader"
import { PlayersType } from "types"

const { renderTokens, splitPlayersToLeftAndRightSide } = tableUtils

const Side: React.FC<{sidePlayers: PlayersType[]}> = observer(({sidePlayers}) => (
  <StyledSide>
    {sidePlayers.map(({player_number, player_name}) => (
      <Fragment key={player_number}>
      <img
        src="/assets/playingcards/card_background.png"
        alt={player_number.toString()}
        width="50"
        height="100"
      />
        <img
        src={`/assets/tokens/${player_number.match(/\d+/)[0]}.png`}
        alt={player_number.toString()}
        width="25"
      />
      <p>{player_name}</p>
      </Fragment>
    ))}
  </StyledSide>
))


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

  const sides = players && player ? splitPlayersToLeftAndRightSide(players, player) : null
  const { left = [], right = [] } = sides || {}

  return (
    <StyledTable>
      <TableHeader />
      {players && player && <Side sidePlayers={left} />}
      <Main>
        <GameArea>
          <CenterCards />
          {(hasCurator || hasSentinel || hasMarks) && renderTokens(artifacts, hasCurator, hasSentinel, selectedMarks)}
        </GameArea>
      </Main>
      {players && player && <Side sidePlayers={right} />}
      <TableFooter />
    </StyledTable>
  )
})
