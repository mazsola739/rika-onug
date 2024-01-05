import { observer } from 'mobx-react-lite'
import { gameTableStore, selectedDeckStore } from 'store'
import {
  StyledGameTable,
  CenterCardContainer,
  Shield,
} from './GameTable.styles'
import { GameTableFooter } from './GameTableFooter'
import { GameTableHeader } from './GameTableHeader'
import { artifacts } from 'data'
import { gameTableUtils } from './GameTable.utils'

export const GameTable = observer(() => {
  const {
    renderPlayers,
    renderCenterCard,
    renderCenterExtraCard,
    renderMarks,
    renderArtifacts,
    getRandomPlayer,
  } = gameTableUtils
  const { centerCards, chosenWolf, chosenSuperVillain } =
    gameTableStore.distributeCards()
  const { hasSentinel, hasMarks, hasDoppelganger, hasCurator, players } =
    gameTableStore
  const selectedMarks = selectedDeckStore.selectedMarks

  const randomPlayer = getRandomPlayer(players) //todo delete

  return (
    <>
      <GameTableHeader player={randomPlayer} />
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
