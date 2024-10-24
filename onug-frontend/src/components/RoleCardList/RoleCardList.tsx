import { observer } from 'mobx-react-lite'
import { roomStore } from 'store'
import { RoleCard } from '../RoleCard/RoleCard'
import { RoleCardListGrid, RoleCardListTitle, StyledRoleCardList } from './RoleCardList.styles'
import { RoleCardListProps } from './RoleCardList.types'

export const RoleCardList: React.FC<RoleCardListProps> = observer(({ team, cards }) => {
  const { getTeamMembers, getTeamName } = roomStore

  const teamMembers = getTeamMembers(cards)
  const teamName = getTeamName(cards, team).replace(/\b\w/g, l => l.toUpperCase())

  return (
    <StyledRoleCardList id={`${teamName}`}>
      <RoleCardListTitle>{`${teamName} TEAM`}</RoleCardListTitle>
      <RoleCardListGrid>
        {teamMembers.map((card, index) => (
          <RoleCard key={index} card={card} />
        ))}
      </RoleCardListGrid>
    </StyledRoleCardList>
  )
})
