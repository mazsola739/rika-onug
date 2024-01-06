import { Card } from 'components'
import { observer } from 'mobx-react-lite'
import { roomStore } from 'store'
import { StyledCardList, CardListTitle, CardListGrid } from './CardList.styles'
import { CardListProps } from './CardList.types'

export const CardList = observer(({ team, cards, room_id }: CardListProps) => {
  const { getTeamMembers, getTeamName } = roomStore

  const teamMembers = getTeamMembers(cards)
  const teamName = getTeamName(cards, team).toUpperCase()

  return (
    <StyledCardList>
      <CardListTitle>{`${teamName} TEAM`}</CardListTitle>
      <CardListGrid>
        {teamMembers.map((card) => (
          <Card key={card.id} card={card} room_id={room_id} />
        ))}
      </CardListGrid>
    </StyledCardList>
  )
})
