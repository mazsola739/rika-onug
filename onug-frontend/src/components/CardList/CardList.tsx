import { Card } from 'components'
import { observer } from 'mobx-react-lite'
import { roomStore } from 'store'
import { StyledCardList, CardListTitle, CardListGrid } from './CardList.styles'
import { CardListProps } from './CardList.types'

export const CardList: React.FC<CardListProps> = observer(({ team, cards }) => {
  const { getTeamMembers, getTeamName } = roomStore

  const teamMembers = getTeamMembers(cards)
  const teamName = getTeamName(cards, team).toUpperCase()

  return (
    <StyledCardList>
      <CardListTitle>{`${teamName} TEAM`}</CardListTitle>
      <CardListGrid>
        {teamMembers.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </CardListGrid>
    </StyledCardList>
  )
})
