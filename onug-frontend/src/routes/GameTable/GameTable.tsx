import {
  ARRIVE_GAME_TABLE,
  HYDRATE_GAME_TABLE,
  HYDRATE_READY,
  REDIRECT,
  STAGES,
} from 'constant'
import { artifacts } from 'data'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import {
  gameTableStore,
  playerStore,
  roomStore,
  selectedDeckStore,
  deckStore,
  wsStore,
} from 'store'
import { utils } from 'utils'
import {
  GameArea,
  OwnCardPlace,
  Ready,
  StyledGameTable,
} from './GameTable.styles'
import { gameTableUtils } from './GameTable.utils'
import { GameTableFooter } from './GameTableFooter'
import { GameTableHeader } from './GameTableHeader'
import { useNavigate } from 'react-router-dom'
import { DealtCards, Main, OwnCard, PlayerList } from 'components'

const { findCardById } = utils
const { renderMarks, renderArtifacts } = gameTableUtils

//! TODO boardCards!

export const GameTable: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const token = sessionStorage.getItem('token')

  const { hasSentinel, hasMarks, hasCurator } = gameTableStore
  const selectedMarks = selectedDeckStore.selectedMarks
  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()

  const { setPlayer } = playerStore
  const { setPlayers, setBoardCards } = gameTableStore

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
        player_card_id: lastJsonMessage.player_card_id,
        player_name: lastJsonMessage.player_name,
        player_number: lastJsonMessage.player_number,
        player_card: findCardById(
          deckStore.deck,
          lastJsonMessage.player_card_id
        ),
      })
      setPlayers(lastJsonMessage.board.players)
      setBoardCards(lastJsonMessage.board.boardCards)
      roomStore.resetDetailedCardInfo()
      selectedDeckStore.addCardIdsToArray()
    }

    if (lastJsonMessage?.type === HYDRATE_READY) {
      setPlayers(lastJsonMessage.board.players)
      setBoardCards(lastJsonMessage.board.boardCards)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, setPlayer, setBoardCards, deckStore, navigate])

  const { player } = playerStore
  const { players } = gameTableStore
  const { boardCards } = gameTableStore

  return (
    <StyledGameTable>
      <GameTableHeader />
      <Main>
        <OwnCardPlace>{player && <OwnCard player={player} />}</OwnCardPlace>
        <GameArea>
          {(hasCurator || hasSentinel) &&
            renderArtifacts(artifacts, hasCurator, hasSentinel)}
          <DealtCards players={players} boardCards={boardCards} />
          {hasMarks && renderMarks(selectedMarks)}
        </GameArea>
        <Ready>{players && <PlayerList players={players} />}</Ready>
      </Main>
      <GameTableFooter />
    </StyledGameTable>
  )
})
