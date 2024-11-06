import { Filter, Main, Nav, RoleCardList } from 'components'
import { observer } from 'mobx-react-lite'
import { roomStore } from 'store'
import { RoomCardList, StyledRoom } from './Room.styles'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'
import { RoomInfoPanel } from './RoomInfoPanel'
import { useRoom } from './useRoom'

//TODO searchbar?
export const Room: React.FC = observer(() => {
  const { orderedTeams, anchorList } = useRoom()

  return (
    <StyledRoom>
      <RoomHeader />
      <Nav anchorList={anchorList} />
      <Main>
        <RoomCardList>
          {' '}
          {/* TODO just like centercards or centertokens */}
          {orderedTeams.map((teamName, index) => (
            <RoleCardList key={index} team={teamName} cards={roomStore.getSortedCardsByTeam(teamName)} />
          ))}
        </RoomCardList>
      </Main>
      <Filter />
      <RoomFooter />
      <RoomInfoPanel />
    </StyledRoom>
  )
})
