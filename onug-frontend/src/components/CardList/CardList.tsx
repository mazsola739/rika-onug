import { Card } from 'components'
import { observer } from 'mobx-react-lite'
import { roomStore } from 'store'
import { StyledCardList, CardListTitle, CardListGrid } from './CardList.styles'
import { CardListProps } from './CardList.types'
import { useEffect, useState } from 'react'

export const CardList: React.FC<CardListProps> = observer(({ team, cards }) => {
  const { getTeamMembers, getTeamName } = roomStore

  const teamMembers = getTeamMembers(cards)
  const teamName = getTeamName(cards, team).toUpperCase()

  return (
    <StyledCardList id={`${teamName}`}>
      <CardListTitle>{`${teamName} TEAM`}</CardListTitle>
      <CardListGrid>
        {teamMembers.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </CardListGrid>
    </StyledCardList>
  )
})
