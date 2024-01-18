import { observer } from 'mobx-react-lite'
import { gameTableStore, selectedDeckStore, wsStore } from 'store'
import {
  StyledGameTable,
  CenterCardContainer,
  Shield,
} from './GameTable.styles'
import { GameTableFooter } from './GameTableFooter'
import { GameTableHeader } from './GameTableHeader'
import { artifacts } from 'data'
import { gameTableUtils } from './GameTable.utils'
import { useEffect, useState } from 'react'
import { ARRIVE_GAME_TABLE, HYDRATE_GAME_TABLE, STAGES } from 'constant'

export const GameTable: React.FC = observer(() => {
  const {
    renderPlayers,
    renderCenterCard,
    renderCenterExtraCard,
    renderMarks,
    renderArtifacts,
  } = gameTableUtils
  const { centerCards, chosenWolf, chosenSuperVillain } =
    gameTableStore.distributeCards()
  const { hasSentinel, hasMarks, hasDoppelganger, hasCurator, players } =
    gameTableStore
  const selectedMarks = selectedDeckStore.selectedMarks

  const [firstTime, setFirstTime] = useState(true)

  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage({
        type: ARRIVE_GAME_TABLE,
        stage: STAGES.GAME_TABLE,
        room_id: sessionStorage.getItem('room_id'),
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_GAME_TABLE) {
      console.log(lastJsonMessage) //TODO hook
    }
  }, [sendJsonMessage, lastJsonMessage])

  return (
    <>
      <GameTableHeader />
      <StyledGameTable>
        {renderPlayers(players)}
        <CenterCardContainer>
          {hasSentinel && (
            <Shield
              src={require(`../../assets/tokens/shield.png`)}
              alt="shield"
            />
          )}
          {chosenWolf && renderCenterExtraCard('Werewolf')}
          {renderCenterCard('Center', centerCards)}
          {chosenSuperVillain && renderCenterExtraCard('Villain')}
        </CenterCardContainer>
        {hasMarks && renderMarks(selectedMarks, hasDoppelganger)}
        {hasCurator && renderArtifacts(artifacts)}
      </StyledGameTable>
      <GameTableFooter />
    </>
  )
})
