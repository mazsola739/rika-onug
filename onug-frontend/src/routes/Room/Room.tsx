import { observer } from 'mobx-react-lite'
import { roomStore, selectedDeckStore } from 'store'
import { StyledRoom, CenterCardContainer, Shield } from './Room.styles'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'
import { artifacts } from 'data'
import { roomUtils } from './Room.utils'

export const Room = observer(() => {
  const {
    renderPlayers,
    renderCenterCard,
    renderCenterExtraCard,
    renderMarks,
    renderArtifacts,
    getRandomPlayer,
  } = roomUtils
  const { centerCards, chosenWolf, chosenSuperVillain } =
    roomStore.distributeCards()
  const { hasSentinel, hasMarks, hasDoppelganger, hasCurator, players } =
    roomStore
  const selectedMarks = selectedDeckStore.selectedMarks

  const randomPlayer = getRandomPlayer(players) //todo delete

  return (
    <>
      <RoomHeader player={randomPlayer} />
      <StyledRoom>
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
      </StyledRoom>
      <RoomFooter />
    </>
  )
})
