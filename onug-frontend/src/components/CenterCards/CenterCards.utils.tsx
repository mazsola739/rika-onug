import { deckStore } from 'store'
import { PlayerCard } from '..'
import { CardGroup, GroupTitle, Cards, CenterCardContainer } from './CenterCards.styles'

export const renderCenterCard = () => {
  const { hasAlphawolf, hasTemptress } = deckStore

  const renderCard = (position: string, title: string) => {
    return (
        <CardGroup>
          <GroupTitle>{title}</GroupTitle>
          <Cards>
            <PlayerCard id={0} position={position} isCenter={true} />
          </Cards>
        </CardGroup>
    )
  }

  return (
    <CenterCardContainer>
      {hasAlphawolf && renderCard('center_wolf', 'Wolf')}
      <CardGroup>
        <GroupTitle>Center</GroupTitle>
        <Cards>
          {['center_left', 'center_middle', 'center_right'].map(
            (position, index) => <PlayerCard key={index} id={0} position={position} isCenter={true} />
          )}
        </Cards>
      </CardGroup>
      {hasTemptress && renderCard('center_villain', 'Villain')}
    </CenterCardContainer>
  )
}
