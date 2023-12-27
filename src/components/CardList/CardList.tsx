import { Card } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { StyledCardList, CardListTitle, CardListGrid } from './CardList.styles'
import { CardListProps } from './CardList.types'

export const CardList = observer(({ team, cards }: CardListProps) => {
  const { getTeamMembers, getTeamName } = deckStore

  const teamMembers = getTeamMembers(cards)
  const teamName = getTeamName(cards, team).toUpperCase()

  return (
    <StyledCardList>
      <CardListTitle>{`${teamName} TEAM`}</CardListTitle>
      <CardListGrid>
        {teamMembers.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </CardListGrid>
    </StyledCardList>
  )
})
