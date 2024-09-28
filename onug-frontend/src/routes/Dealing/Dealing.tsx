import { Main } from 'components'
import { ARRIVE_DEALING, STAGES, HYDRATE_DEALING, HYDRATE_READY, REDIRECT } from 'constant'
import { artifacts } from 'data'
import { observer } from 'mobx-react-lite'
import { OwnCard, DealtCards, ReadyList } from 'modules'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { dealingStore, deckStore, gameBoardStore, wsStore, roomStore } from 'store'
import { StyledDealing, OwnCardPlace, GameArea, Ready } from './Dealing.styles'
import { dealingUtils } from './Dealing.utils'
import { DealingFooter } from './DealingFooter'
import { DealingHeader } from './DealingHeader'

const { renderMarks, renderArtifacts } = dealingUtils

export const Dealing: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const token = sessionStorage.getItem('token')

  const { hasSentinel, hasMarks, hasCurator } = dealingStore
  const { selectedMarks } = deckStore
  const { setPlayer, setPlayers, everyoneCheckOwnCard } = gameBoardStore
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
    <StyledDealing>
      <DealingHeader player={player} />
      <Main>
        <OwnCardPlace>{player && <OwnCard player={player} />}</OwnCardPlace>
        <GameArea>
          {(hasCurator || hasSentinel) && renderArtifacts(artifacts, hasCurator, hasSentinel)}
          <DealtCards />
          {hasMarks && renderMarks(selectedMarks)}
        </GameArea>
        <Ready>{players && <ReadyList players={players} />}</Ready>
      </Main>
      <DealingFooter />
    </StyledDealing>
  )
})
