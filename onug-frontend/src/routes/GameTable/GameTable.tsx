import { ARRIVE_GAME_TABLE, HYDRATE_GAME_TABLE, HYDRATE_READY, REDIRECT, STAGES } from 'constant'
import { artifacts } from 'data'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { gameTableStore, gameBoardStore, roomStore, deckStore, wsStore } from 'store'
import { GameArea, OwnCardPlace, Ready, StyledGameTable } from './GameTable.styles'
import { gameTableUtils } from './GameTable.utils'
import { GameTableFooter } from './GameTableFooter'
import { GameTableHeader } from './GameTableHeader'
import { useNavigate } from 'react-router-dom'
import { DealtCards, Main, OwnCard, ReadyList } from 'components'

const { renderMarks, renderArtifacts } = gameTableUtils

export const GameTable: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const token = sessionStorage.getItem('token')

  const { hasSentinel, hasMarks, hasCurator } = gameTableStore
  const { selectedMarks } = deckStore
  const { setPlayer, setPlayers, everyoneCheckOwnCard } = gameBoardStore
  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage({
        type: ARRIVE_GAME_TABLE,
        stage: STAGES.GAME_TABLE,
        token,
        room_id: sessionStorage.getItem('room_id'),
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_GAME_TABLE) {
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
    <StyledGameTable>
      <GameTableHeader player={player} />
      <Main>
        <OwnCardPlace>{player && <OwnCard player={player} />}</OwnCardPlace>
        <GameArea>
          {(hasCurator || hasSentinel) && renderArtifacts(artifacts, hasCurator, hasSentinel)}
          <DealtCards />
          {hasMarks && renderMarks(selectedMarks)}
        </GameArea>
        <Ready>{players && <ReadyList players={players} />}</Ready>
      </Main>
      <GameTableFooter />
    </StyledGameTable>
  )
})
