import { Nav, Main, RoleCardList, Filter } from 'layouts'
import { observer } from 'mobx-react-lite'
import { roomStore } from 'store'
import { StyledRoom, RoomCardList } from './Room.styles'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'
import { RoomInfoPanel } from './RoomInfoPanel'
import { useRoom } from './useRoom'

//TODO searchbar?
export const Room: React.ComponentType = observer(() => {
  const { orderedTeams, anchorList } = useRoom()

  return (
    <StyledRoom>
      <RoomHeader />
      <Nav anchorList={anchorList} />
      <Main>
        <RoomCardList>
          {orderedTeams.map((teamName) => (
            <RoleCardList key={teamName} team={teamName} cards={roomStore.getSortedCardsByTeam(teamName)} />
          ))}
        </RoomCardList>
      </Main>
      <Filter />
      <RoomFooter />
      <RoomInfoPanel />
    </StyledRoom>
  )
})
