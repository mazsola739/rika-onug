import { Main, ReadyList, DealtCards } from "components"
import { ARRIVE_DEALING, STAGES, HYDRATE_DEALING, HYDRATE_READY, REDIRECT } from "constant"
import { artifacts } from "data"
import { observer } from "mobx-react-lite"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { dealingStore, deckStore, gameBoardStore, wsStore, roomStore } from "store"
import { StyledTable, GameArea, Ready } from "./Table.styles"
import { tableUtils } from "./Table.utils"
import { TableFooter } from "./TableFooter"
import { TableHeader } from "./TableHeader"

const { renderMarks, renderArtifacts } = tableUtils

export const Table: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const token = sessionStorage.getItem('token')

  const { hasSentinel, hasMarks, hasCurator } = dealingStore
  const { selectedMarks } = deckStore
  const { setPlayer, setPlayers, everyoneCheckOwnCard } = gameBoardStore
  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()

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
      everyoneCheckOwnCard(lastJsonMessage.board.gameTableBoardCards)
      roomStore.resetDetailedCardInfo()
      deckStore.setSelectedCard(lastJsonMessage.selected_cards)
    }

    if (lastJsonMessage?.type === HYDRATE_READY) {
      setPlayers(lastJsonMessage.board.players)
      everyoneCheckOwnCard(lastJsonMessage.board.gameTableBoardCards)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, setPlayer, setPlayers, everyoneCheckOwnCard, navigate])

  const { player, players } = gameBoardStore

  return (
    <StyledTable>
      <TableHeader player={player} />
      <Main>
        <GameArea>
          <Ready>{players && <ReadyList players={players} />}</Ready>
          <DealtCards />
          {(hasCurator || hasSentinel) &&
            renderArtifacts(artifacts, hasCurator, hasSentinel)}
          {hasMarks && renderMarks(selectedMarks)}
        </GameArea>
      </Main>
      <TableFooter />
    </StyledTable>
  )
})
