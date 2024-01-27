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
  CenterCardContainer,
  Shield,
  StyledGameTable,
} from './GameTable.styles'
import { gameTableUtils } from './GameTable.utils'
import { GameTableFooter } from './GameTableFooter'
import { GameTableHeader } from './GameTableHeader'
import { useNavigate } from 'react-router-dom'

const { findCardById } = utils
const {
  renderOwnCard,
  renderPlayers,
  renderPlayerCards,
  renderCenterCard,
  renderCenterExtraCard,
  renderMarks,
  renderArtifacts,
} = gameTableUtils

export const GameTable: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const token = sessionStorage.getItem('token')

  const {
    hasSentinel,
    hasMarks,
    hasDoppelganger,
    hasCurator,
    hasAlphaWolf,
    hasTemptress,
  } = gameTableStore
  const selectedMarks = selectedDeckStore.selectedMarks
  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()

  const { setPlayer } = playerStore
  const { setPlayers } = gameTableStore
  const players = gameTableStore.players
  const player = playerStore.player

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
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
      roomStore.resetDetailedCardInfo()
      selectedDeckStore.addCardIdsToArray()
      console.log(lastJsonMessage) //TODO ready not ready updates from lastJsonMessage
    }

    if (lastJsonMessage?.type === HYDRATE_READY) {
      setPlayers(lastJsonMessage.board.players)
      console.log(lastJsonMessage) //TODO here handle only ready not ready updates from lastJsonMessage
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, setPlayer, deckStore])

  return (
    <>
      <GameTableHeader />
      {player && renderOwnCard(player)}
      <StyledGameTable>
        {players && renderPlayerCards(players)}
        <CenterCardContainer>
          {hasSentinel && (
            <Shield src={`/assets/tokens/shield.png`} alt="shield" />
          )}
          {hasAlphaWolf && renderCenterExtraCard('Werewolf')}
          {renderCenterCard('Center')}
          {hasTemptress && renderCenterExtraCard('Villain')}
        </CenterCardContainer>
        {hasMarks && renderMarks(selectedMarks, hasDoppelganger)}
        {/* //TODO redesign */}
        {hasCurator && renderArtifacts(artifacts)}
      </StyledGameTable>
      {players && renderPlayers(players)}
      <GameTableFooter />
    </>
  )
})
